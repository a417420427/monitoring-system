import { config } from './config'

/**
 * 发送报告到服务器
 * 
 * @param data 报告的数据，是一个包含任意类型属性的对象
 * @param type 报告的类型
 */
export function report(data: Record<string, any>, type: string) {
  const payload = {
    appId: config.appId,
    userId: config.userId || '',
    type,
    timestamp: Date.now(),
    data,
  }

  const blob = new Blob([JSON.stringify(payload)], {
    type: 'application/json',
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(config.reportUrl, blob)
  } else {
    fetch(config.reportUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {})
  }

  if (config.debug) {
    console.log('[report]', type, data)
  }
}
