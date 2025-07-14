import { collectPerformanceMetrics } from "../../../sdk-monitor/src/performance";

function patchHistoryForPerf(callback: () => void) {
  const rawPushState = history.pushState;
  const rawReplaceState = history.replaceState;

  history.pushState = function (...args) {
    rawPushState.apply(this, args);
    callback();
  };

  history.replaceState = function (...args) {
    rawReplaceState.apply(this, args);
    callback();
  };

  window.addEventListener("popstate", callback);
}

patchHistoryForPerf(() => {
  console.log('jjjjjjjjj')
  collectPerformanceMetrics();
});
