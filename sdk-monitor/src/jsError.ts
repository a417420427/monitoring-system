import { report } from './reporter'

/**
 * 初始化网络错误监听器
 * 此函数会覆盖window.fetch方法，以监听并报告网络请求的错误。
 * 如果fetch请求失败（非2xx响应或抛出异常），则会调用report函数报告错误信息。
 * 报告的信息包括请求的URL、状态码（或错误信息）、请求耗时等。
 */
export function initJsErrorListener() {
  window.addEventListener("error", (event: ErrorEvent) => {
    // 过滤资源加载错误（已由 resourceError 捕获）
    if (event.target !== window) return;

    const errorInfo = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack || null,
      type: "jsError",
      pageURL: location.href,
      timestamp: Date.now(),
    };

    report(errorInfo, "jsError");
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;

    const errorInfo = {
      message: reason?.message || String(reason),
      stack: reason?.stack || null,
      type: "promiseError",
      pageURL: location.href,
      timestamp: Date.now(),
    };

    report(errorInfo, "jsError");
  });
}
