// controllers/ClickEventController.ts
import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { ClickEventService } from "../services/ClickEventService";
import { ClickEvent } from "../entities/ClickEvent";

@Route("report/click")
@Tags("Click")
export class ClickEventController extends Controller {
  private service = new ClickEventService();

  @Post("/")
  public async report(@Body() body: Partial<ClickEvent>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getByProject(@Query() projectId: number): Promise<ClickEvent[]> {
    return this.service.findByProject(projectId);
  }
}
