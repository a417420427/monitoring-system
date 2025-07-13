import { report } from "./reporter";
import { onLCP, onFCP, onINP, onCLS, onTTFB } from "web-vitals";

// 指标缓存和定时器管理
const metricsBuffer: Record<string, number> = {};
let reportTimeout: number | null = null;

// 缓冲上报函数，1秒内收集指标，合并成一次请求
function bufferedReport(key: string, value: number) {
  metricsBuffer[key] = value;
  console.log(key, value, 'ss')
  if (reportTimeout === null) {
    reportTimeout = window.setTimeout(() => {
      report({ ...metricsBuffer }, "performance");
      reportTimeout = null;
      // 清空缓存
      Object.keys(metricsBuffer).forEach((k) => delete metricsBuffer[k]);
    }, 1000);
  }
}

// 页面卸载时用 report 方法发送剩余指标
window.addEventListener("beforeunload", () => {
  if (Object.keys(metricsBuffer).length > 0) {
    // 这里直接调用 report，保持统一
    report({ ...metricsBuffer }, "performance");

    // 清空缓存，防止重复发送
    Object.keys(metricsBuffer).forEach((k) => delete metricsBuffer[k]);
  }
});

// ⏱️ 1. 导航阶段指标
function collectNavigationTiming(timing: PerformanceNavigationTiming) {
  bufferedReport("dnsTime", timing.domainLookupEnd - timing.domainLookupStart);
  bufferedReport("tcpTime", timing.connectEnd - timing.connectStart);
  bufferedReport(
    "sslTime",
    timing.secureConnectionStart > 0
      ? timing.connectEnd - timing.secureConnectionStart
      : 0
  );
  bufferedReport("ttfb", timing.responseStart - timing.requestStart);
  bufferedReport("responseTime", timing.responseEnd - timing.responseStart);
  bufferedReport(
    "domContentLoaded",
    timing.domContentLoadedEventEnd - timing.startTime
  );
  bufferedReport("domParseTime", timing.domComplete - timing.domInteractive);
  bufferedReport("loadTime", timing.loadEventEnd - timing.startTime);
  bufferedReport("fp", timing.responseStart - timing.requestStart);
}

// 🎨 2. Paint 阶段指标（FCP/FP）
function collectPaintMetrics() {
  const entries = performance.getEntriesByType("paint");
  entries.forEach((entry) => {
    bufferedReport(entry.name, entry.startTime);
  });
}

// 🐢 3. Web Vitals：LCP / FID / CLS / INP
function collectWebVitals() {
  onLCP((metric) => bufferedReport("lcp", metric.value));
  onFCP((metric) => bufferedReport("fcp", metric.value));
  onTTFB((metric) => bufferedReport("ttfb", metric.value));
  onINP((metric) => bufferedReport("inp", metric.value));
  onCLS((metric) => bufferedReport("cls", metric.value));
}

// 🚧 4. 阻塞时间（TBT）
function collectLongTasks() {
  const observer = new PerformanceObserver((list) => {
    let totalBlockingTime = 0;
    for (const entry of list.getEntries()) {
      const blocking = entry.duration - 50;
      if (blocking > 0) {
        totalBlockingTime += blocking;
      }
    }
    bufferedReport("tbt", totalBlockingTime);
  });

  observer.observe({ type: "longtask", buffered: true });
}

// 📊 5. 主入口（on load 后统一采集）
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
