import {
  Controller,
  Route,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Tags,
  Patch,
  Path,
  Request,
} from 'tsoa';
import { ApiKeyService } from '../services/ApiKeyService';
import { ApiKey } from '../entities/ApiKey';
import {
  ServiceResponse,
  successResponse,
  errorResponse,
} from '../services/ResponseService';

@Route('apikeys')
@Tags('API Keys')
export class ApiKeyController extends Controller {
  private service = new ApiKeyService();

  /**
   * 创建 API Key
   */
  @Post('/')
  public async create(
    @Body() body: { appId: number; label: string }
  ): Promise<ServiceResponse<ApiKey | null>> {
    try {
      const key = await this.service.generateKey(body.appId, body.label);
      return successResponse(key, 'API Key 创建成功');
    } catch (error) {
      this.setStatus(500);
      return errorResponse('API Key 创建失败');
    }
  }

  /**
   * 获取项目下所有 API Keys
   */
  @Get('/')
  public async list(
    @Query() appId: number
  ): Promise<ServiceResponse<ApiKey[] | null>> {
    try {
      const list = await this.service.listByProject(appId);
      return successResponse(list, 'API Key 列表获取成功');
    } catch (error) {
      this.setStatus(500);
      return errorResponse('获取 API Key 列表失败');
    }
  }

  /**
   * 修改启用状态
   */
  @Patch('{id}/status')
  public async toggle(
    @Path() id: number,
    @Body() body: { status: 'enabled' | 'disabled' }
  ): Promise<ServiceResponse<any>> {
    try {
      const updated = await this.service.toggleActive(id, body.status);
      return successResponse(updated, 'API Key 状态更新成功');
    } catch (error) {
      this.setStatus(500);
      return errorResponse('更新 API Key 状态失败');
    }
  }

  /**
   * 删除 API Key
   */
  @Delete('{id}')
  public async remove(
    @Path() id: number
  ): Promise<ServiceResponse<null>> {
    try {
      await this.service.delete(id);
      // if (!result) {
      //   this.setStatus(404);
      //   return errorResponse('API Key 不存在');
      // }
      return successResponse(null, 'API Key 删除成功');
    } catch (error) {
      this.setStatus(500);
      return errorResponse('删除 API Key 失败');
    }
  }
}
