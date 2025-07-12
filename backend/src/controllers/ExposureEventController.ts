// controllers/ExposureEventController.ts
import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { ExposureEventService } from "../services/ExposureEventService";
import { ExposureEvent } from "../entities/ExposureEvent";

@Route("report/exposure")
@Tags("Exposure")
export class ExposureEventController extends Controller {
  private service = new ExposureEventService();

  @Post("/")
  public async report(@Body() body: Partial<ExposureEvent>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getByProject(@Query() projectId: number): Promise<ExposureEvent[]> {
    return this.service.findByProject(projectId);
  }
}
