import { config } from './config'

const reportEndpoints: Record<string, string> = {
  performance: '/performance',
  error: '/error',
  behavior: '/behavior',
  // 你可以继续添加更多类型和对应路径
};

/**
 * 发送报告到服务器
 * 
 * @param data 报告的数据，是一个包含任意类型属性的对象
 * @param type 报告的类型，如 'performance'、'error'、'behavior'
 */
export function report(data: Record<string, any>, type: string) {
  const url = (config.reportUrl || '') + (reportEndpoints[type] || '');

  const payload = {
    appId: config.appId,
    userId: config.userId || '',
    type,
    timestamp: Date.now(),
    data,
  };

  const blob = new Blob([JSON.stringify(payload)], {
    type: 'application/json',
  });

  if (navigator.sendBeacon && url) {
    navigator.sendBeacon(url, blob);
  } else if (url) {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {});
  }

  if (config.debug) {
    console.log('[report]', type, data);
  }
}
