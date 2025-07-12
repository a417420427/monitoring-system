export interface MonitorConfig {
  appId: string
  userId?: string
  reportUrl: string
  debug?: boolean
}

export interface ReportPayload {
  appId: string
  userId?: string
  type: ReportType
  timestamp: number
  data: any
}

export type ReportType =
  | 'performance'
  | 'jsError'
  | 'resourceError'
  | 'click'
  | 'pageView'
  | 'stayDuration'
  | 'exposure'
  | 'custom'
  | 'fetchError'
