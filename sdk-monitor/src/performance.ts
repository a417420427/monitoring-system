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
    "domContentLoaded", "domParseTime", "loadTime", "fcp"
  ]),
  DELAYED_METRICS: new Set(["lcp", "inp", "fid", "cls", "tbt"]),
  MAX_WAIT_TIME: 10000
};

let loadMetricsCollected = false;
let delayedMetricsTimer: number | null = null;
let delayedReported = false;
let pageIdCounter = 0;

// 生成更可靠的页面ID
function generatePageId(): string {
  return `${Date.now()}-${pageIdCounter++}-${Math.random().toString(16).slice(2, 8)}`;
}

let currentPageId = generatePageId();

function sendReport(immediate = false): void {
  try {
    // 使用副本避免竞争条件
    const currentMetrics = { ...metricsBuffer };
    const currentLateMetrics = { ...lateMetricsBuffer };

    if (Object.keys(currentMetrics).length > 0) {
      report({ 
        ...currentMetrics, 
        pageId: currentPageId, 
        url: location.href 
      }, "performance");
      
      // 仅删除已上报的指标
      Object.keys(currentMetrics).forEach((k) => delete metricsBuffer[k]);
    }

    if (immediate && Object.keys(currentLateMetrics).length > 0) {
      report({ 
        ...currentLateMetrics, 
        pageId: currentPageId, 
        url: location.href 
      }, "performance-late");
      
      Object.keys(currentLateMetrics).forEach((k) => delete lateMetricsBuffer[k]);
      delayedReported = true;
    }
  } catch (e) {
    console.error("Performance report failed:", e);
  } finally {
    if (delayedMetricsTimer) {
      clearTimeout(delayedMetricsTimer);
      delayedMetricsTimer = null;
    }
  }
}

function resetState(): void {
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

function flushBeforeRouteChange(): void {
  if (!delayedReported) {
    sendReport(true);
  }
  resetState();
}

function checkAndReport(metricName: string): void {
  // 不再初始化默认值，仅检查是否存在
  if (METRICS_CONFIG.LOAD_METRICS.has(metricName)) {
    const allCollected = Array.from(METRICS_CONFIG.LOAD_METRICS)
      .every(metric => metric in metricsBuffer);

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
      .every(metric => metric in lateMetricsBuffer);

    if (allCollected && !delayedReported) {
      sendReport(true);
    }
  }
}

function collectAndReport(key: string, value: number): void {
  // 不覆盖已有值（确保web-vitals的指标优先级高于navigation timing）
  if (metricsBuffer[key] === undefined) {
    metricsBuffer[key] = value;
    checkAndReport(key);
  }
}

function registerUnloadHandlers(): void {
  const sendLateMetrics = () => {
    if (!delayedReported) {
      sendReport(true);
    }
  };

  window.addEventListener("beforeunload", () => {
    if (delayedMetricsTimer) clearTimeout(delayedMetricsTimer);
    sendLateMetrics();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendLateMetrics();
    }
  });
}

function collectNavigationTiming(timing: PerformanceNavigationTiming): void {
  collectAndReport("dnsTime", timing.domainLookupEnd - timing.domainLookupStart);
  collectAndReport("tcpTime", timing.connectEnd - timing.connectStart);
  collectAndReport("sslTime", timing.secureConnectionStart > 0 ? timing.connectEnd - timing.secureConnectionStart : 0);
  collectAndReport("ttfb", timing.responseStart - timing.requestStart);
  collectAndReport("responseTime", timing.responseEnd - timing.responseStart);
  collectAndReport("domContentLoaded", timing.domContentLoadedEventEnd - timing.startTime);
  collectAndReport("domParseTime", timing.domComplete - timing.domInteractive);
  collectAndReport("loadTime", timing.loadEventEnd - timing.startTime);
  // 移除 fp 的采集，完全依赖 collectPaintMetrics
}

function collectPaintMetrics(): void {
  const entries = performance.getEntriesByType("paint");
  entries.forEach((entry) => {
    if (entry.name === 'first-paint') {
      collectAndReport("fp", entry.startTime);
    } else if (entry.name === 'first-contentful-paint') {
      collectAndReport("fcp", entry.startTime);
    }
  });
}

function collectWebVitals(): void {
  onLCP(metric => collectAndReport("lcp", metric.value));
  onFCP(metric => {
    // 确保web-vitals的fcp覆盖navigation timing的fcp
    metricsBuffer["fcp"] = metric.value;
    checkAndReport("fcp");
  });
  onTTFB(metric => collectAndReport("ttfb", metric.value));
  onINP(metric => collectAndReport("inp", metric.value));

  onCLS(metric => collectAndReport("cls", metric.value));
}

function collectLongTasks(): void {
  const observer = new PerformanceObserver((list) => {
    const longTasks = performance.getEntriesByType("longtask");
    const tbt = longTasks.reduce((sum, entry) => {
      return sum + Math.max(entry.duration - 50, 0);
    }, 0);
    collectAndReport("tbt", tbt);
  });

  observer.observe({ type: "longtask", buffered: true });
}

function collectPerformanceMetrics(): void {
  const collect = () => {
    const [timing] = performance.getEntriesByType?.("navigation") || [];
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

function patchHistoryEvents(): void {
  const rawPush = history.pushState;
  const rawReplace = history.replaceState;

  function handleRouteChange() {
    flushBeforeRouteChange();
    // 同步采集关键指标
    const [timing] = performance.getEntriesByType?.("navigation") || [];
    if (timing) collectNavigationTiming(timing);
    collectPaintMetrics();
    
    // 异步采集其他指标
    setTimeout(() => {
      collectWebVitals();
      collectLongTasks();
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

export function initPerformanceSDK(): void {
  collectPerformanceMetrics();
  patchHistoryEvents();
}