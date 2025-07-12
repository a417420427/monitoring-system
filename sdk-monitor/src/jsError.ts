import { report } from "./reporter";

/**
 * 初始化JavaScript错误监听器。
 *
 * 该函数会监听window上的'error'和'unhandledrejection'事件，用于捕获JavaScript运行时的错误和未处理的Promise拒绝。
 * 当捕获到错误或未处理的Promise拒绝时，会将这些信息打印到控制台，并通过report函数进行上报。
 * 
 * 'error'事件包含错误信息、行号、列号以及具体的错误对象。
 * 'unhandledrejection'事件包含未处理的Promise拒绝的原因，可能是一个错误对象或者任何值。
 */
export function initJsErrorListener() {
  window.addEventListener("error", ({ message, lineno, colno, error }) => {
    console.log(message, lineno, colno, error);
    report(
      {
        message,

        lineno,
        colno,
        stack: error?.stack,
      },
      "jsError"
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    report(
      {
        message: event.reason?.message || "unhandledrejection",
        stack: event.reason?.stack,
      },
      "jsError"
    );
  });
}
