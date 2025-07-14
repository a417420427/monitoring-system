import { report } from "./reporter";
import {
  onLCP,
  onFCP,
  onINP,
  onCLS,
  onTTFB,
} from "web-vitals";

// 缓存指标
const metricsBuffer: Record<string, number> = {};
const lateMetricsBuffer: Record<string, number> = {};

// 关键指标配置
const METRICS_CONFIG = {
  LOAD_METRICS: new Set([
    "dnsTime", "tcpTime", "sslTime", "ttfb", "responseTime",
    "domContentLoaded", "domParseTime", "loadTime", "fp", "fcp"
  ]),
  DELAYED_METRICS: new Set(["lcp", "inp", "fid", "cls", "tbt"]),
  MAX_WAIT_TIME: 10000
};

let loadMetricsCollected = false;
let delayedMetricsTimer: number | null = null;
let delayedReported = false;

// 当前页面唯一标识，方便区分不同页面数据
let currentPageId = generatePageId();

function generatePageId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function sendReport(immediate = false) {
  if (Object.keys(metricsBuffer).length > 0) {
    report({ ...metricsBuffer, pageId: currentPageId, url: location.href }, "performance");
    Object.keys(metricsBuffer).forEach((k) => delete metricsBuffer[k]);
  }

  if (immediate && Object.keys(lateMetricsBuffer).length > 0) {
    report({ ...lateMetricsBuffer, pageId: currentPageId, url: location.href }, "performance-late");
    Object.keys(lateMetricsBuffer).forEach((k) => delete lateMetricsBuffer[k]);
    delayedReported = true;
  }

  if (delayedMetricsTimer) {
    clearTimeout(delayedMetricsTimer);
    delayedMetricsTimer = null;
  }
}

function resetState() {
  Object.keys(metricsBuffer).forEach((k) => delete metricsBuffer[k]);
  Object.keys(lateMetricsBuffer).forEach((k) => delete lateMetricsBuffer[k]);
  loadMetricsCollected = false;
  delayedReported = false;
  if (delayedMetricsTimer) {
    clearTimeout(delayedMetricsTimer);
    delayedMetricsTimer = null;
  }
  currentPageId = generatePageId();
}

// 路由切换前，强制上报并重置状态
function flushBeforeRouteChange() {
  if (!delayedReported) {
    sendReport(true);
  }
  resetState();
}

function checkAndReport(metricName: string) {
  metricsBuffer[metricName] = metricsBuffer[metricName] ?? 0;

  if (METRICS_CONFIG.LOAD_METRICS.has(metricName)) {
    const allCollected = Array.from(METRICS_CONFIG.LOAD_METRICS)
      .every(metric => metricsBuffer[metric] !== undefined);

    if (allCollected && !loadMetricsCollected) {
      loadMetricsCollected = true;

      delayedMetricsTimer = window.setTimeout(() => {
        if (!delayedReported) {
          sendReport(true);
        }
      }, METRICS_CONFIG.MAX_WAIT_TIME);
    }
  }

  if (METRICS_CONFIG.DELAYED_METRICS.has(metricName)) {
    lateMetricsBuffer[metricName] = metricsBuffer[metricName];
    const allCollected = Array.from(METRICS_CONFIG.DELAYED_METRICS)
      .every(metric => lateMetricsBuffer[metric] !== undefined);

    if (allCollected && !delayedReported) {
      sendReport(true);
    }
  }
}

function collectAndReport(key: string, value: number) {
  metricsBuffer[key] = value;
  checkAndReport(key);
}

// 页面卸载或隐藏时上报剩余延迟指标
function registerUnloadHandlers() {
  const sendLateMetrics = () => {
    if (!delayedReported) {
      sendReport(true);
    }
  };

  window.addEventListener("beforeunload", sendLateMetrics);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendLateMetrics();
    }
  });
}

// 1. 导航阶段指标
function collectNavigationTiming(timing: PerformanceNavigationTiming) {
  collectAndReport("dnsTime", timing.domainLookupEnd - timing.domainLookupStart);
  collectAndReport("tcpTime", timing.connectEnd - timing.connectStart);
  collectAndReport("sslTime", timing.secureConnectionStart > 0 ? timing.connectEnd - timing.secureConnectionStart : 0);
  collectAndReport("ttfb", timing.responseStart - timing.requestStart);
  collectAndReport("responseTime", timing.responseEnd - timing.responseStart);
  collectAndReport("domContentLoaded", timing.domContentLoadedEventEnd - timing.startTime);
  collectAndReport("domParseTime", timing.domComplete - timing.domInteractive);
  collectAndReport("loadTime", timing.loadEventEnd - timing.startTime);
  collectAndReport("fp", timing.responseStart - timing.requestStart); // 可重写为真正 FP
}

// 2. Paint 阶段指标
function collectPaintMetrics() {
  const entries = performance.getEntriesByType("paint");
  entries.forEach((entry) => {
    if (entry.name === 'first-paint') {
      collectAndReport("fp", entry.startTime);
    } else if (entry.name === 'first-contentful-paint') {
      collectAndReport("fcp", entry.startTime);
    }
  });
}

// 3. Web Vitals
function collectWebVitals() {
  onLCP(metric => collectAndReport("lcp", metric.value));
  onFCP(metric => collectAndReport("fcp", metric.value));
  onTTFB(metric => collectAndReport("ttfb", metric.value));
  onINP(metric => collectAndReport("inp", metric.value));
  // onFID(metric => collectAndReport("fid", metric.value));
  onCLS(metric => collectAndReport("cls", metric.value));
}

// 4. 阻塞时间 TBT
function collectLongTasks() {
  const observer = new PerformanceObserver((list) => {
    let totalBlockingTime = 0;
    for (const entry of list.getEntries()) {
      const blocking = entry.duration - 50;
      if (blocking > 0) {
        totalBlockingTime += blocking;
      }
    }
    collectAndReport("tbt", totalBlockingTime);
  });

  observer.observe({ type: "longtask", buffered: true });
}

// 主入口
export function collectPerformanceMetrics() {
  const collect = () => {
    const [timing] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (timing) {
      collectNavigationTiming(timing);
    }

    collectPaintMetrics();
    collectWebVitals();
    collectLongTasks();
    registerUnloadHandlers();
  };

  if (document.readyState === "complete") {
    collect();
  } else {
    window.addEventListener("load", collect, { once: true });
  }
}

// 监听 History 路由变化（支持 SPA）
function patchHistoryEvents() {
  const rawPush = history.pushState;
  const rawReplace = history.replaceState;

  function handleRouteChange() {
    flushBeforeRouteChange();
    setTimeout(() => {
      collectPerformanceMetrics();
    }, 0);
  }

  history.pushState = function (...args) {
    rawPush.apply(this, args);
    handleRouteChange();
  };

  history.replaceState = function (...args) {
    rawReplace.apply(this, args);
    handleRouteChange();
  };

  window.addEventListener("popstate", handleRouteChange);
}

// 启动 SDK（供外部调用）
export function initPerformanceSDK() {
  collectPerformanceMetrics(); // 首屏采集
  patchHistoryEvents();        // 路由变更自动采集
}
