// src/middlewares/errorHandler.ts

import { Response } from "express";
import { ApiResponse } from "../utils/apiResponse";

export function errorResponse(err: any, res: Response) {
  if (err instanceof CustomError) {
    return ApiResponse.error(
      res,
      {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      err.statusCode
    );
  }

  // 处理其他类型的错误
  return ApiResponse.error(
    res,
    {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
    500
  );
}

// 自定义错误类
export class CustomError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 400,
    public details?: any
  ) {
    super(message);
  }
}
