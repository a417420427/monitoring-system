import {
  Controller,
  Post,
  Route,
  Body,
  Tags,
  Get,
  Query,
} from "tsoa";
import { PerformanceService } from "../services/PerformanceService";
import { PerformanceLog } from "../entities/PerformanceLog";


// dto/PerformanceLogDTO.ts
export class PerformanceLogDTO {
  projectId!: number;
  appId!: string;
  url!: string;
  referrer?: string;

  userId?: string;
  sessionId?: string;
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
  userAgent!: string;
  deviceType?: string;
  os?: string;
  browser?: string;
  screen?: string;
  lang?: string;

  networkType?: string;
  dnsTime?: number;
  tcpTime?: number;
  sslTime?: number;
  ttfb?: number;
  responseTime?: number;

  fp?: number;
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  tbt?: number;
  loadTime?: number;
  domContentLoadedTime?: number;
  domParseTime?: number;
  interactionToNextPaint?: number;

  pageStayTime?: number;
  isJump?: boolean;
  isError?: boolean;
  errorMessage?: string;

  metrics?: Record<string, number | string>;
}

@Route("report/performance")
@Tags("Performance")
export class PerformanceController extends Controller {
  private service = new PerformanceService();

  // 单条上报
  @Post("/")
  public async report(@Body() body: PerformanceLogDTO): Promise<{ success: boolean; message?: string }> {
    if (!body.appId) {
      this.setStatus(400);
      return { success: false, message: "appId is required" };
    }
    try {
      await this.service.create(body);
      return { success: true };
    } catch (err) {
      this.setStatus(500);
      return { success: false, message: (err as Error).message };
    }
  }

  // 批量上报接口
  @Post("/batch")
  public async batchReport(@Body() body: Partial<PerformanceLog>[]): Promise<{ success: boolean; message?: string }> {
    if (!Array.isArray(body) || body.length === 0) {
      this.setStatus(400);
      return { success: false, message: "Request body must be a non-empty array" };
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
  @Get("/")
  public async getRecent(
    @Query() appId: string,
    @Query() limit: number = 50
  ): Promise<PerformanceLog[]> {
    if (!appId) {
      this.setStatus(400);
      return [];
    }
    return this.service.findRecentByAppId(appId, limit);
  }
}





