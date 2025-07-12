import { report } from './reporter'

/**
 * 监听并点击匹配给定选择器的元素。
 * 
 * @param selector - 用于选择DOM元素的CSS选择器。
 * @param extraData - （可选）额外的数据对象，将与点击事件的数据一起报告。
 */
export function trackClick(selector: string, extraData?: any) {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target && target.matches(selector)) {
      report({
        tag: target.tagName,
        class: target.className,
        selector,
        extraData,
      }, 'click')
    }
  })
}

/**
 * 跟踪页面视图
 * 
 * @param url 当前页面的URL
 */
export function trackPageView(url: string) {
  report({ url }, 'pageView')
}

/**
 * 跟踪用户停留时长
 * @param url 用户停留的页面URL
 * @param duration 用户在该页面的停留时长（单位：秒）
 */
export function trackStayDuration(url: string, duration: number) {
  report({ url, duration }, 'stayDuration')
}

/**
 * 追踪页面上特定选择器的元素是否进入视口
 * 
 * @param selector CSS选择器字符串，用于选取需要追踪的元素
 */
export function trackExposure(selector: string) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        report({
          selector,
          visible: true,
        }, 'exposure')
        observer.unobserve(entry.target)
      }
    })
  })

  document.querySelectorAll(selector).forEach(el => observer.observe(el))
}
