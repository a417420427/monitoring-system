import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { JsErrorLogService } from "../services/JsErrorLogService";
import { JsErrorLog } from "../entities/JsErrorLog";

import { AppDataSource } from "../data-source";
import {
  errorResponse,
  ServiceResponse,
  successResponse,
} from "../services/ResponseService";
import { Project } from "../entities/Project";


@Route("report/jsErrorLog")
@Tags("JsErrorLog")
export class JsErrorController extends Controller {
  private service = new JsErrorLogService();
  private repo = AppDataSource.getRepository(Project);
  // 单条上报
  @Post("/")
  public async report(
    @Body() body: Record<string, any>
  ): Promise<{ success: boolean; message?: string }> {
    const { config = {}, payload = {}, timestamp, url } = body;

    console.log(url, 'uuuuuuu')
    if (!config.projectId) {
      this.setStatus(400);
      return { success: false, message: "未找到项目id" };
    }

    const project = await this.repo.findOneBy({ id: config.projectId });
    if (!project) {
      this.setStatus(400);
      return { success: false, message: "未找到项目" };
    }

    try {
      await this.service.create({
        projectId: config.projectId,
        url,
        lang: config.lang,
        userAgent: config.userAgent,
        os: config.os,
        browser: config.browser,
        deviceType: config.deviceType,
        ip: config.ip,
        country: config.country,
        region: config.region,
        city: config.city,
        clientTimestamp: timestamp,
        message: payload.message,
        payload: payload,
        project: project,
      });

      return { success: true };
    } catch (err) {
      this.setStatus(500);
      return { success: false, message: (err as Error).message };
    }
  }

  // 批量上报接口
  @Post("/batch")
  public async batchReport(
    @Body() body: Partial<JsErrorLog>[]
  ): Promise<{ success: boolean; message?: string }> {
    if (!Array.isArray(body) || body.length === 0) {
      this.setStatus(400);
      return {
        success: false,
        message: "Request body must be a non-empty array",
      };
    }
    try {
      await this.service.createMany(body);
      return { success: true };
    } catch (err) {
      this.setStatus(500);
      return { success: false, message: (err as Error).message };
    }
  }

  // 查询最近的若干条
  @Get("/list")
  public async listPerformanceLogs(
    @Query() projectId?: number,
    @Query() limit: number = 50,
    @Query() url?: string,
    @Query() deviceType?: string,
    @Query() os?: string,
    @Query() browser?: string,
    @Query() country?: string,
    @Query() startTime?: string,
    @Query() endTime?: string
  ): Promise<ServiceResponse<JsErrorLog[] | null>> {


    try {
      const response = await this.service.findWithFilters({
        projectId,
        url,
        deviceType,
        os,
        browser,
        country,
        startTime,
        endTime,
        limit,
      });
      return successResponse(response, "接口查询成功");
    } catch (error) {
      console.log(error, 'eeeeeeee')
      this.setStatus(500);
      return errorResponse("接口查询失败");
    }
  }
}
