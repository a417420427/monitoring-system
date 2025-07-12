// controllers/FetchErrorController.ts
import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { FetchErrorService } from "../services/FetchErrorService";
import { FetchError } from "../entities/FetchError";

@Route("report/fetch-error")
@Tags("FetchError")
export class FetchErrorController extends Controller {
  private service = new FetchErrorService();

  @Post("/")
  public async report(@Body() body: Partial<FetchError>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getByProject(@Query() projectId: number): Promise<FetchError[]> {
    return this.service.findByProject(projectId);
  }
}
