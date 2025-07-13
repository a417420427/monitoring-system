import { report } from './reporter'

/**
 * 采集资源加载错误：图片、脚本、样式、媒体、iframe等
 */
export function initResourceErrorListener() {
  window.addEventListener(
    'error',
    (event: Event) => {
      const target = event.target as HTMLElement;

      if (!target) return;

      const tagName = target.tagName.toUpperCase();

      // 支持的资源类型
      const isResource =
        ['IMG', 'SCRIPT', 'LINK', 'IFRAME', 'VIDEO', 'AUDIO'].includes(tagName);

      if (!isResource) return;

      const url = (target as any).src || (target as any).href || '';

      if (!url) return;

      const errorInfo = {
        tagName,
        url,
        type: (target as any).type || '',
        outerHTML: target.outerHTML.slice(0, 300), // 防止过长
        pageURL: location.href,
        timestamp: Date.now(),
      };

      report(errorInfo, 'resourceError');
    },
    true // useCapture = true，捕获阶段监听
  );
}
