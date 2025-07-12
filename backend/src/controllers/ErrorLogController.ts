// controllers/ErrorLogController.ts
import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { ErrorLogService } from "../services/ErrorLogService";
import { ErrorLog } from "../entities/ErrorLog";

@Route("report/errors")
@Tags("Error")
export class ErrorLogController extends Controller {
  private service = new ErrorLogService();

  @Post("/")
  public async report(@Body() body: Partial<ErrorLog>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getRecent(@Query() id: number, @Query() limit: number = 50): Promise<ErrorLog[]> {
    return this.service.findRecentByAppId(id, limit);
  }
}
