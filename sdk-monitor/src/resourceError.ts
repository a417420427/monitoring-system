import { report } from './reporter'

/**
 * 初始化资源错误监听器
 * 该函数为全局window对象添加了一个捕获错误事件的事件监听器，当资源（如图片、脚本、链接）加载失败时，会触发该监听器。
 * 如果错误事件的目标是一个图片、脚本或链接元素，则会调用report函数来报告这个错误。
 */
export function initResourceErrorListener() {
  window.addEventListener('error', (event: Event) => {
    const target = event.target as HTMLElement
    if (target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
      report({
        tagName: target.tagName,
        src: (target as any).src || (target as any).href,
      }, 'resourceError')
    }
  }, true)
}
