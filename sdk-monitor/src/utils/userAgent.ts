export interface UserAgentInfo {
  browser: string;
  browserVersion: string;
  os: string;
  deviceType: "mobile" | "tablet" | "desktop" | "bot" | "unknown";
  userAgent: string;
}

export function getUserAgentInfo(): UserAgentInfo {
  const ua = navigator.userAgent || "";

  // 浏览器及版本检测
  let browser = "unknown";
  let browserVersion = "unknown";

  const browserMatchers = [
    { name: "Edge", regex: /Edg\/([\d\.]+)/ },
    { name: "Chrome", regex: /Chrome\/([\d\.]+)/ },
    { name: "Firefox", regex: /Firefox\/([\d\.]+)/ },
    { name: "Safari", regex: /Version\/([\d\.]+).*Safari/ },
    { name: "Opera", regex: /OPR\/([\d\.]+)/ },
    { name: "IE", regex: /MSIE\s([\d\.]+);/ },
    { name: "IE", regex: /Trident.*rv:([\d\.]+)/ },
  ];

  for (const bm of browserMatchers) {
    const match = ua.match(bm.regex);
    if (match) {
      browser = bm.name;
      browserVersion = match[1];
      break;
    }
  }

  // 操作系统检测
  let os = "unknown";
  if (/Windows NT 10.0/.test(ua)) os = "Windows 10";
  else if (/Windows NT 6.3/.test(ua)) os = "Windows 8.1";
  else if (/Windows NT 6.2/.test(ua)) os = "Windows 8";
  else if (/Windows NT 6.1/.test(ua)) os = "Windows 7";
  else if (/Windows NT 6.0/.test(ua)) os = "Windows Vista";
  else if (/Windows NT 5.1/.test(ua)) os = "Windows XP";
  else if (/Mac OS X 10[._]\d+/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  // 设备类型检测
  let deviceType: UserAgentInfo["deviceType"] = "unknown";
  if (/Mobile|iPhone|Android/.test(ua)) deviceType = "mobile";
  else if (/iPad|Tablet/.test(ua)) deviceType = "tablet";
  else if (/bot|crawl|spider|slurp|mediapartners/i.test(ua)) deviceType = "bot";
  else deviceType = "desktop";

  return {
    browser,
    browserVersion,
    os,
    deviceType,
    userAgent: ua,
  };
}
