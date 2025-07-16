// src/utils/apiResponse.ts

import { Response } from 'express';


interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string | number;
    message: string;
    details?: any;
  };
}

// 分页元数据接口
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 分页响应接口
interface PaginatedResponse<T> extends BaseResponse<T[]> {
  meta: PaginationMeta;
}

export class ApiResponse {
  // 成功响应
  static success<T>(res: Response, data: T, message: string = 'Success') {
    const response: BaseResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(200).json(response);
  }

  // 分页成功响应
  static paginated<T>(
    res: Response,
    data: T[],
    meta: PaginationMeta,
    message: string = 'Success'
  ) {
    const response: PaginatedResponse<T> = {
      success: true,
      message,
      data,
      meta,
    };
    return res.status(200).json(response);
  }

  // 错误响应
  static error(
    res: Response,
    error: {
      code: string | number;
      message: string;
      details?: any;
    },
    statusCode: number = 400
  ) {
    const response: BaseResponse<null> = {
      success: false,
      error,
    };
    return res.status(statusCode).json(response);
  }
}