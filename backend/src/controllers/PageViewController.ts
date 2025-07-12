// controllers/PageViewController.ts
import { Controller, Post, Route, Body, Tags, Get, Query } from "tsoa";
import { PageViewService } from "../services/PageViewService";
import { PageView } from "../entities/PageView";

@Route("report/page-view")
@Tags("PageView")
export class PageViewController extends Controller {
  private service = new PageViewService();

  @Post("/")
  public async report(@Body() body: Partial<PageView>): Promise<{ success: boolean }> {
    try {
      await this.service.create(body);
      return { success: true };
    } catch {
      this.setStatus(500);
      return { success: false };
    }
  }

  @Get("/")
  public async getByProject(@Query() projectId: number): Promise<PageView[]> {
    return this.service.findByProject(projectId);
  }
}
