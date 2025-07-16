// 基础响应接口
export interface BaseServiceResponse {
  success: boolean;
  message: string;
  meta?: {
    total: number;
    page: number;
    size: number;
  }
}

// 普通数据响应
export interface ServiceResponse<T> extends BaseServiceResponse {
  data?: T;
}

// 分页数据响应
export interface ServiceResponseWithPage<T> extends BaseServiceResponse {
  data: T,
  meta: {
    total: number;
    page: number;
    size: number;
  }
}

// 成功响应（普通数据）
export function successResponse<T>(
  data: T,
  message = "Success"
): ServiceResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

// 成功响应（分页数据）
export function successPageResponse<T>(
  data: T,
  total: number,
  page: number,
  size: number,
  message = "Success"
): ServiceResponseWithPage<T> {
  return {
    success: true,
    message,
    data,
    meta: {
      total,
      page,
      size,
    }
  };
}

// 错误响应（兼容两种返回类型）
// export function errorResponse<T = never>(
//   message = "Error"
// ): ServiceResponse<T> & ServiceResponseWithPage<T> {
//   return {
//     success: false,
//     message,
//   } as ServiceResponse<T> & ServiceResponseWithPage<T>;
// }

export function errorResponse<T = never>(
  message = "Error"
): any {
  return {
    success: false,
    message,
  } as any;
}