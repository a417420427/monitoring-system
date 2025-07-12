import { report } from './reporter'

/**
 * 初始化网络错误监听器
 * 此函数会覆盖window.fetch方法，以监听并报告网络请求的错误。
 * 如果fetch请求失败（非2xx响应或抛出异常），则会调用report函数报告错误信息。
 * 报告的信息包括请求的URL、状态码（或错误信息）、请求耗时等。
 */
export function initNetworkErrorListener() {
  const originFetch = window.fetch
  window.fetch = async (...args) => {
    const start = performance.now()
    try {
      const res = await originFetch(...args)
      const duration = performance.now() - start
      if (!res.ok) {
        report({
          url: res.url,
          status: res.status,
          duration,
        }, 'fetchError')
      }
      return res
    } catch (err) {
      const duration = performance.now() - start
      report({
        url: (args[0] as string),
        error: err.message,
        duration,
      }, 'fetchError')
      throw err
    }
  }
}
