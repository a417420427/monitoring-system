import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { PerformanceService } from "../services/PerformanceService";
import { PerformanceLog } from "../entities/PerformanceLog";
import { Project } from "../entities/Project";
import { AppDataSource } from "../data-source";
import {
  errorResponse,
  ServiceResponse,
  ServiceResponseWithPage,
  successPageResponse,
  successResponse,
} from "../services/ResponseService";

@Route("report/performance")
@Tags("Performance")
export class PerformanceController extends Controller {
  private service = new PerformanceService();
  private repo = AppDataSource.getRepository(Project);
  // 单条上报
  @Post("/")
  public async report(
    @Body() body: Record<string, any>
  ): Promise<{ success: boolean; message?: string }> {
    const { config = {}, payload = {}, timestamp, url } = body;

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
        url,
        projectId: config.projectId,
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
    @Body() body: Partial<PerformanceLog>[]
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
    @Query() page: number,
    @Query() size: number,
    @Query() projectId?: number,
    @Query() url?: string,
    @Query() deviceType?: string,
    @Query() os?: string,
    @Query() browser?: string,
    @Query() country?: string,
    @Query() startTime?: string,
    @Query() endTime?: string
  ): Promise<ServiceResponseWithPage<PerformanceLog[] | null>> {


    try {
      const response = await this.service.findWithFilters({
        page,
        size,
        projectId,
        url,
        deviceType,
        os,
        browser,
        country,
        startTime,
        endTime,
      });
      return successPageResponse(...response, page, size, "接口查询成功");
    } catch (error) {
      console.log(error, 'eeeeeeee')
      this.setStatus(500);
      return errorResponse("接口查询失败");
    }
  }
}
