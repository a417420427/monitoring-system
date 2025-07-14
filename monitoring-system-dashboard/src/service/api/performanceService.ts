import http from "../http";

// 上报 payload 类型
export interface PerformanceMetrics {
  cls: number;
  inp: number;
  lcp: number;
}

export interface PerformanceRecord {
  id: number;
  projectId: number;
  lang: string;
  userAgent: string;
  os: string;
  browser: string;
  deviceType: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  payload: PerformanceMetrics;
  clientTimestamp: string;
  createdAt: string;
}

// 返回结构（可根据后端返回格式调整）
export interface ReportResponse {
  success: boolean;
  message?: string;
}


// 上报性能日志
export const getPerformanceList = () => {
  return http.get<ServiceResponse<PerformanceRecord[]>>("/report/performance/list");
};

