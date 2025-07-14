import { collectClientInfo } from "./utils/client";
export interface MonitorConfig {
  projectId: number;

  apiKey: string;

  userAgent?: string;
  debug?: boolean;
  reportUrl: string;
}

export let config: MonitorConfig;

export async function initConfig(options: MonitorConfig) {
  const ua = await collectClientInfo();
  config = {
    ...options,
    ...ua,
  };
}
