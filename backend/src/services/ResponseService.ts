// 返回结果类型
export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// 公共返回包装函数
export function successResponse<T>(data: T, message = "Success"): ServiceResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(message = "Error"): ServiceResponse<null> {
  return {
    success: false,
    message,
  };
}
