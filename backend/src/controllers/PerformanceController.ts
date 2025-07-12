import {
  Controller,
  Post,
  Route,
  Body,
  Tags,
  Get,
  Query
} from "tsoa";
import { PerformanceService } from "../services/PerformanceService";
import { PerformanceLog } from "../entities/PerformanceLog";

@Route("report/performance")
@Tags("Performance")
export class PerformanceController extends Controller {
  private service = new PerformanceService();

  @Post("/")
  public async report(@Body() body: Partial<PerformanceLog>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch (err) {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getRecent(
    @Query() appId: string,
    @Query() limit: number = 50
  ): Promise<PerformanceLog[]> {
    return this.service.findRecentByAppId(appId, limit);
  }
}
