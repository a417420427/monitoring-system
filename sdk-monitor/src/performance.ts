import { report } from "./reporter";
import { onLCP, onFCP, onINP, onCLS, onTTFB } from "web-vitals";

// 指标缓存
const metricsBuffer: Record<string, number> = {};

// 关键指标配置
const METRICS_CONFIG = {
  // 页面加载阶段指标（会在load事件后立即收集）
  LOAD_METRICS: new Set([
    "dnsTime",
    "tcpTime",
    "sslTime",
    "ttfb",
    "responseTime",
    "domContentLoaded",
    "domParseTime",
    "loadTime",
    "fp",
    "fcp"
  ]),
  
  // 延迟指标（可能在页面交互后才会触发）
  DELAYED_METRICS: new Set([
    "lcp",
    "inp",
    "cls",
    "tbt"
  ]),
  
  // 最大等待延迟指标的时间（毫秒）
  MAX_WAIT_TIME: 10000
};

let loadMetricsCollected = false;
let delayedMetricsTimer: number | null = null;

// 上报函数
function sendReport() {
  if (Object.keys(metricsBuffer).length > 0) {
    report({ ...metricsBuffer }, "performance");
    // 清空缓存
    Object.keys(metricsBuffer).forEach((k) => delete metricsBuffer[k]);
  }
  
  if (delayedMetricsTimer) {
    clearTimeout(delayedMetricsTimer);
    delayedMetricsTimer = null;
  }
}

// 检查并上报指标
function checkAndReport(metricName: string) {
  metricsBuffer[metricName] = metricsBuffer[metricName] ?? 0;
  
  // 如果是加载阶段指标且全部收集完成
  if (METRICS_CONFIG.LOAD_METRICS.has(metricName)) {
    const allLoadMetricsCollected = Array.from(METRICS_CONFIG.LOAD_METRICS)
      .every(metric => metricsBuffer[metric] !== undefined);
    
    if (allLoadMetricsCollected && !loadMetricsCollected) {
      loadMetricsCollected = true;
      
      // 启动延迟指标的超时计时器
      delayedMetricsTimer = window.setTimeout(() => {
        sendReport();
      }, METRICS_CONFIG.MAX_WAIT_TIME);
    }
  }
  
  // 如果所有延迟指标都收集完成
  if (METRICS_CONFIG.DELAYED_METRICS.has(metricName)) {
    const allDelayedMetricsCollected = Array.from(METRICS_CONFIG.DELAYED_METRICS)
      .every(metric => metricsBuffer[metric] !== undefined);
    
    if (allDelayedMetricsCollected) {
      sendReport();
    }
  }
}

// 收集并上报指标
function collectAndReport(key: string, value: number) {
  metricsBuffer[key] = value;
  checkAndReport(key);
}

// 页面卸载时上报剩余数据
window.addEventListener("beforeunload", () => {
  sendReport();
});

// 1. 导航阶段指标
function collectNavigationTiming(timing: PerformanceNavigationTiming) {
  collectAndReport("dnsTime", timing.domainLookupEnd - timing.domainLookupStart);
  collectAndReport("tcpTime", timing.connectEnd - timing.connectStart);
  collectAndReport(
    "sslTime",
    timing.secureConnectionStart > 0
      ? timing.connectEnd - timing.secureConnectionStart
      : 0
  );
  collectAndReport("ttfb", timing.responseStart - timing.requestStart);
  collectAndReport("responseTime", timing.responseEnd - timing.responseStart);
  collectAndReport(
    "domContentLoaded",
    timing.domContentLoadedEventEnd - timing.startTime
  );
  collectAndReport("domParseTime", timing.domComplete - timing.domInteractive);
  collectAndReport("loadTime", timing.loadEventEnd - timing.startTime);
  collectAndReport("fp", timing.responseStart - timing.requestStart);
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
  onLCP((metric) => collectAndReport("lcp", metric.value));
  onFCP((metric) => collectAndReport("fcp", metric.value));
  onTTFB((metric) => collectAndReport("ttfb", metric.value));
  onINP((metric) => collectAndReport("inp", metric.value));
  onCLS((metric) => collectAndReport("cls", metric.value));
}

// 4. 阻塞时间（TBT）
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
    const [timing] = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    if (timing) {
      collectNavigationTiming(timing);
    }

    collectPaintMetrics();
    collectWebVitals();
    collectLongTasks();
  };

  if (document.readyState === "complete") {
    collect();
  } else {
    window.addEventListener("load", collect, { once: true });
  }
}