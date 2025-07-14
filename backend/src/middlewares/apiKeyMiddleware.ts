// middlewares/apiKeyMiddleware.ts
import { Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { ApiKey } from "../entities/ApiKey";
import { AuthRequest } from "./authMiddleware";

export const apiKeyMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {


  if(!req.path.startsWith('/api/report')) {
    return next();
  }


  const apiKey = req.headers["x-api-key"] || req.query.apiKey || req.body.apiKey;
  console.log(req.query, req.body, req.headers)
  if (!apiKey || typeof apiKey !== "string") {
    return res.status(401).json({ success: false, message: "Missing API key" });
  }

  const repo = AppDataSource.getRepository(ApiKey);
  const record = await repo.findOne({
    where: { key: apiKey, status: "enabled" },
    relations: ["project"],
  });

  if (!record) {
    return res.status(403).json({ success: false, message: "Invalid or disabled API key" });
  }

  // 挂载项目到 request 上，供后续处理使用
  (req as any).project = record.project;

  next();
};
