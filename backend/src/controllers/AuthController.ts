import { Controller, Post, Route, Tags, Body, SuccessResponse } from "tsoa";
import { UserService } from "../services/UserService";
import { signJwt } from "../utils/jwt";
import bcrypt from "bcrypt";
import {
  errorResponse,
  ServiceResponse,
  successResponse,
} from "../services/ResponseService";
import { User } from "../entities/User";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  private userService = new UserService();

  @SuccessResponse("200", "登录成功")
  @Post("login-by-password")
  public async loginByPassword(
    @Body()
    body: {
      password: string;
      username?: string;
      email?: string;
    }
  ): Promise<ServiceResponse<null | (User & { token: string })>> {
    const { email, username, password } = body;

    const identifier = email || username;
    if (!identifier) {
      this.setStatus(400);
      return errorResponse("用户名或邮箱为空");
    }
    console.log(body, "aaaaaa");
    // 根据邮箱或者账号
    const user = await this.userService.getUserByUserNameOrEmail(identifier);

    console.log(user, "sssssssss");
    if (!user || !user.passwordHash) {
      this.setStatus(400);
      return errorResponse("用户名或密码错误");
    }

    // 验证密码哈希
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      this.setStatus(400);
      return errorResponse("用户名或密码错误");
    }

    // 更新登录时间
    await this.userService.updateUser(user.id, {
      ...user,
    });

    // 生成JWT
    const token = signJwt({ id: user.id }, "30m");

    return successResponse({ ...user, token });
  }

  /**
   * 用户注册
   */
  @SuccessResponse("201", "注册成功")
  @Post("register")
  public async register(
    @Body()
    body: {
      password: string;
      email: string;
      username: string;
    }
  ): Promise<ServiceResponse<null | (User & { token: string })>> {
    const { password, username, email } = body;

    // 创建新用户
    const user = await this.userService.createUser({
      email,
      password,
      username: username || email,
    });

    if (!user.data) {
      return errorResponse(user.message);
    }
    // 生成 token
    const token = signJwt({ id: user.data.id }, "30m");

    this.setStatus(201);
    return successResponse({ ...user.data, token });
  }
}
