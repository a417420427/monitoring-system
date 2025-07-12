import { initConfig, MonitorConfig } from "./config";

import { collectPerformanceMetrics } from "./performance";

import { initJsErrorListener } from "./jsError";

import { initResourceErrorListener } from "./resourceError";

import { initNetworkErrorListener } from "./network";

import {
  trackClick,
  trackExposure,
  trackPageView,
  trackStayDuration,
} from "./behavior";

import { report } from "./reporter";

export function initMonitor(options: MonitorConfig) {
  initConfig(options);
  collectPerformanceMetrics();
  initJsErrorListener();
  initResourceErrorListener();
  initNetworkErrorListener();

  trackPageView(location.href);

  window.addEventListener("beforeunload", () => {
    const stayTime = Date.now() - performance.timing.navigationStart;
    trackStayDuration(location.href, stayTime);
  });

  // 默认监听所有加 data-monitor-click / expose 的元素
  trackClick("[data-monitor-click]");
  trackExposure("[data-monitor-expose]");
}

// 导出方法用于模块方式调用
export { trackClick, trackExposure, trackPageView, trackStayDuration, report };

// 支持浏览器全局使用
if (typeof window !== "undefined") {
  (window as any).MonitorSDK = {
    initMonitor,
    trackClick,
    trackExposure,
    trackPageView,
    trackStayDuration,
    report,
  };
}
