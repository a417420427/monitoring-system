export interface MonitorConfig {
  appId: string
  userId?: string
  debug?: boolean
  reportUrl: string
}

export let config: MonitorConfig

export function initConfig(options: MonitorConfig) {
  config = options
}
