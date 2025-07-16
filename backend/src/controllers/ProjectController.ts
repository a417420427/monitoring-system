// controllers/ProjectController.ts
import {
  Controller,
  Post,
  Route,
  Body,
  Tags,
  Get,
  Query,
  Patch,
  Path,
  Request,
  Delete,
} from "tsoa";
import { ProjectService } from "../services/ProjectService";
import { Project } from "../entities/Project";
import {
  ServiceResponse,
  successResponse,
  errorResponse,
  ServiceResponseWithPage,
  successPageResponse,
} from "../services/ResponseService"; // 修改路径按需调整
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../data-source";

// 示例生成逻辑

@Route("projects")
@Tags("Project")
export class ProjectController extends Controller {
  private service = new ProjectService();
  private repo = AppDataSource.getRepository(Project);

  @Post("/")
  public async create(
    @Request() req: any,
    @Body() body: Partial<Project>
  ): Promise<ServiceResponse<Project | null>> {
    try {
      const appId = "app-" + uuidv4().slice(0, 8);

      const project = await this.service.create({
        ...body,
        appId,
        user: req.user,
      });
      return successResponse(project, "Project created successfully");
    } catch (error) {
      this.setStatus(500);
      return errorResponse("Failed to create project");
    }
  }

  @Get("list")
  public async getAllByUser(
    @Request() req: any,
    @Query("page") page = 1,
    @Query("size") size = 10
  ): Promise<ServiceResponseWithPage<Project[] | null>> {
    try {
      const user = req.user;
      const take = Number(size); // 每页数量
      const skip = (Number(page) - 1) * take; // 跳过数量

      const [data, total] = await this.repo.findAndCount({
        where: { user: { id: user.id } },
        order: { createdAt: "DESC" },
        skip,
        take,
      });

      return successPageResponse(data, total, Number(page), Number(size));
    } catch (error) {
      this.setStatus(500);
      return errorResponse("Failed to fetch projects");
    }
  }

  @Get("/by-id")
  public async getById(
    @Query() id: number
  ): Promise<ServiceResponse<Project | null>> {
    try {
      const project = await this.service.findById(id);
      return successResponse(project, "Project found");
    } catch (error) {
      this.setStatus(500);
      return errorResponse("Failed to fetch project by ID");
    }
  }

  @Get("/by-appId")
  public async getByAppId(
    @Query() appId: string
  ): Promise<ServiceResponse<Project | null>> {
    try {
      const project = await this.service.findByAppId(appId);
      return successResponse(project, "Project found");
    } catch (error) {
      this.setStatus(500);
      return errorResponse("Failed to fetch project by appId");
    }
  }

  /**
   * 更新项目状态接口：启用/禁用
   * PATCH /projects/{id}/status
   */
  @Patch("/{id}/status")
  public async updateStatus(
    @Path() id: number,
    @Body() body: { status: "active" | "inactive" }
  ): Promise<ServiceResponse<Project | null>> {
    try {
      const updatedProject = await this.service.updateStatus(id, body.status);
      if (!updatedProject) {
        this.setStatus(404);
        return errorResponse("Project not found");
      }
      return successResponse(updatedProject, "Project status updated");
    } catch (error) {
      this.setStatus(500);
      return errorResponse("Failed to update project status");
    }
  }

  /**
   * 删除项目接口
   * DELETE /projects/{id}
   */
  @Delete("/{id}")
  public async deleteProject(
    @Path() id: number
  ): Promise<ServiceResponse<null>> {
    try {
      const success = await this.service.delete(id);
      if (!success) {
        this.setStatus(404);
        return errorResponse("未找到项目");
      }
      return successResponse(null, "项目删除成功");
    } catch (error) {
      this.setStatus(500);
      return errorResponse("服务错误，删除项目失败");
    }
  }
}
