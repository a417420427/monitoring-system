import { report } from './reporter'

/**
 * 初始化网络错误监听器
 * 此函数会拦截fetch和XHR请求，以监听网络错误
 */
export function initNetworkErrorListener() {
  interceptFetch();
  interceptXHR();
}

function interceptFetch() {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const [url, config] = args;

    try {
      const res = await originalFetch(...args);
      if (!res.ok) {
        report({
          url,
          status: res.status,
          method: config?.method || 'GET',
          type: 'fetch',
          timestamp: Date.now(),
        }, 'networkError');
      }
      return res;
    } catch (err) {
      report({
        url,
        error: String(err),
        method: config?.method || 'GET',
        type: 'fetch',
        timestamp: Date.now(),
      }, 'networkError');
      throw err;
    }
  };
}

function interceptXHR() {
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method: string, url: string) {
    (this as any)._method = method;
    (this as any)._url = url;
    // @ts-ignore
    return originalOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    const xhr = this;

    xhr.addEventListener('loadend', function () {
      const status = xhr.status;
      const url = (xhr as any)._url;
      const method = (xhr as any)._method;

      if (status >= 400 || status === 0) {
        report({
          url,
          status,
          method,
          type: 'xhr',
          timestamp: Date.now(),
        }, 'networkError');
      }
    });
    // @ts-ignore
    return originalSend.apply(this, arguments);
  };
}
