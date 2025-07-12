// controllers/ResourceErrorController.ts
import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { ResourceErrorService } from "../services/ResourceErrorService";
import { ResourceError } from "../entities/ResourceError";

@Route("report/resource-error")
@Tags("ResourceError")
export class ResourceErrorController extends Controller {
  private service = new ResourceErrorService();

  @Post("/")
  public async report(@Body() body: Partial<ResourceError>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getByProject(@Query() projectId: number): Promise<ResourceError[]> {
    return this.service.findByProject(projectId);
  }
}
