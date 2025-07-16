import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { ResourceErrorLogService } from "../services/ResourceErrorLogService";
import { ResourceErrorLog } from "../entities/ResourceErrorLog";

import { AppDataSource } from "../data-source";
import {
  errorResponse,
  ServiceResponse,
  ServiceResponseWithPage,
  successPageResponse,
  successResponse,
} from "../services/ResponseService";
import { Project } from "../entities/Project";


@Route("report/recourceErrorLog")
@Tags("ResourceErrorLog")
export class ResourceErrorController extends Controller {
  private service = new ResourceErrorLogService();
  private repo = AppDataSource.getRepository(Project);
  // 单条上报
  @Post("/")
  public async report(
    @Body() body: Record<string, any>
  ): Promise<ServiceResponse<null>> {
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

      return successResponse(null, '上报成功');
    } catch (err) {
      this.setStatus(500);
      return errorResponse((err as Error).message);
    }
  }

  // 批量上报接口
  @Post("/batch")
  public async batchReport(
    @Body() body: Partial<ResourceErrorLog>[]
  ): Promise<ServiceResponse<null>> {
    if (!Array.isArray(body) || body.length === 0) {
      this.setStatus(400);
      return errorResponse("数据格式错误");
    }
    try {
      await this.service.createMany(body);
      return successResponse(null, '上报成功');
    } catch (err) {
      this.setStatus(500);
      return errorResponse((err as Error).message);
    }
  }

  // 查询最近的若干条
  @Get("/list")
  public async listPerformanceLogs(
    @Query() projectId?: number,
    @Query() url?: string,
    @Query() deviceType?: string,
    @Query() os?: string,
    @Query() browser?: string,
    @Query() country?: string,
    @Query() startTime?: string,
    @Query() endTime?: string,
     @Query("page") page = 1,
    @Query("size") size = 10

  ): Promise<ServiceResponseWithPage<ResourceErrorLog[] | null>> {

    try {
      const [data, total] = await this.service.findWithFilters({
        projectId,
        url,
        deviceType,
        os,
        browser,
        country,
        startTime,
        endTime,
        page,
        size
      });
      return successPageResponse(data, total, page, size);
    } catch (error) {
      console.log(error, 'eeeeeeee')
      this.setStatus(500);
      return errorResponse("接口查询失败");
    }
  }
}
