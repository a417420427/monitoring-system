import { report } from "./reporter";

/**
 * 收集页面导航相关的性能时间指标
 * 
 * @param timing PerformanceNavigationTiming对象，包含了页面导航和加载相关的性能时间信息
 */
function collectNavigationTiming(timing: PerformanceNavigationTiming) {
  const metrics = {
    fp: timing.responseStart - timing.requestStart,
    ttfb: timing.responseStart,
    domContentLoaded: timing.domContentLoadedEventEnd,
    load: timing.loadEventEnd,
  };

  report(metrics, "performance");
}

/**
 * 收集页面渲染相关的性能指标
 * 该函数通过获取performance.getEntriesByType("paint")获取页面渲染过程中的各种绘画事件（如首次内容绘制、首次有效绘制等）
 * 并对每个事件进行遍历，调用report函数将每个事件的名称和开始时间作为性能数据上报
 */
function collectPaintMetrics() {
  const entries = performance.getEntriesByType("paint");
  entries.forEach((entry) => {
    report({ name: entry.name, value: entry.startTime }, "performance");
  });
}

/**
 * 收集性能度量指标
 *
 * 此函数旨在在页面加载完成后收集性能度量指标。首先，它尝试获取导航时间信息，并调用`collectNavigationTiming`函数（假设已定义）来进一步处理这些信息。
 * 如果找不到导航时间信息，则会打印一条警告消息。然后，它会调用`collectPaintMetrics`函数（假设已定义）来收集绘制相关的性能度量指标。
 *
 * 如果文档已经加载完成（`document.readyState`为"complete"），则立即收集性能度量指标。
 * 否则，它会监听`load`事件，并在事件触发时（只触发一次）收集性能度量指标。
 */
export function collectPerformanceMetrics() {
  console.log("collectPerformanceMetrics");

  const collect = () => {
    const [timing] = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    if (timing) {
      collectNavigationTiming(timing);
    } else {
      console.warn("No navigation timing entry found");
    }

    collectPaintMetrics();
  };

  if (document.readyState === "complete") {
    collect();
  } else {
    window.addEventListener("load", collect, { once: true });
  }
}
