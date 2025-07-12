// controllers/StayDurationController.ts
import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { StayDurationService } from "../services/StayDurationService";
import { StayDuration } from "../entities/StayDuration";

@Route("report/stay")
@Tags("StayDuration")
export class StayDurationController extends Controller {
  private service = new StayDurationService();

  @Post("/")
  public async report(@Body() body: Partial<StayDuration>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getByProject(@Query() projectId: number): Promise<StayDuration[]> {
    return this.service.findByProject(projectId);
  }
}
