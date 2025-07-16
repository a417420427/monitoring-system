import http from "../http";

// 上报 payload 类型

export interface JsErrorRecord {
  id: number;
  url: string;

  projectId?: number;
  lang?: string;
  userAgent: string;
  os?: string;
  browser?: string;
  deviceType?: string;
  ip?: string;
  country?: string;
  region?: string;
  city?: string;

  payload?: Record<string, number>;

  clientTimestamp: number;

  createdAt: Date;
}

// 返回结构（可根据后端返回格式调整）
export interface ReportResponse {
  success: boolean;
  message?: string;
}

// 上报性能日志
export const getJsErrorList = (page: PageNationMeta) => {
  return http.get<ServiceResponse<JsErrorRecord[]>>("/report/jsErrorLog/list", {
    params: page
  });
};
