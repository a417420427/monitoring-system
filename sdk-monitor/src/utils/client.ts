import {UAParser} from 'ua-parser-js';

export async function collectClientInfo() {
  const parser = new UAParser();
  const result = parser.getResult();

  const lang = navigator.language;
  const userAgent = navigator.userAgent;
  const os = `${result.os.name} ${result.os.version}`;
  const browser = `${result.browser.name} ${result.browser.version}`;
  const deviceType = result.device.type || 'desktop';

  const geoRes = await fetch("https://ipinfo.io/json?token=3ac875364a90ad");
  const geo = await geoRes.json();

  return {
    lang,
    userAgent,
    os,
    browser,
    deviceType,
    ip: geo.ip,
    country: geo.country,
    region: geo.region,
    city: geo.city,
  };
}
