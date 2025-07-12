enum Performance {
  FCP = "FCP",
  LCP = "LCP",
  CLS = "CLS",
  FID = "FID",
  TTFB = "TTFB",
}
export interface common {
  // 页面性能监控
  collectPerformanceMetrics(): void;

  // JS 异常监控
  initJsErrorListener(): void;
  reportJsError(error: Error | string, stack?: string): void;

  // 静态资源加载异常监控
  initResourceErrorListener(): void;

  // 用户行为采集

  trackPageView(url: string): void;
  trackStayDuration(url: string, duration: number): void;
  trackClick(selector: string, extraData?: any): void;
  trackExposure(selector: string, callback?: Function): void;

  // 自定义事件埋点
}
