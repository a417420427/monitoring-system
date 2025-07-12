import { Controller, Post, Route, Tags, Body, SuccessResponse } from "tsoa";
import { UserService } from "../services/UserService";
import { signJwt } from "../utils/jwt";
import bcrypt from "bcrypt";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  private userService = new UserService();


  @SuccessResponse("200", "登录成功")
  @Post("login-by-password")
  public async loginByPassword(
    @Body() body: { id: number; password: string, username?: string }
  ): Promise<{ token: string; id: number; username: string }> {
 
    const { id, password } = body;

   
    // 根据手机号查用户
    const user = await this.userService.getUserById(id);
    if (!user || !user.passwordHash) {
      this.setStatus(400);
      return Promise.reject(new Error("用户不存在或未设置密码"));
    }

    // 验证密码哈希
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      this.setStatus(400);
      return Promise.reject(new Error("用户名或密码错误"));
    }

    // 更新登录时间
    await this.userService.updateUser(user.id, {
      ...user,
    });

    // 生成JWT
    const token = signJwt({ id: user.id }, "30m");

    return { token, id: user.id, username: user.username! };
  }

  /**
   * 用户注册
   */
  @SuccessResponse("201", "注册成功")
  @Post("register")
  public async register(
    @Body()
    body: {
      id: number;
      password: string;
      username?: string;
    }
  ): Promise<{ token: string; id: number; username: string }> {
    const { id, password, username } = body;

    // 检查手机号是否已注册
    const existingUser = await this.userService.getUserById(id);
    if (existingUser) {
      this.setStatus(400);
      return Promise.reject(new Error("该手机号已注册"));
    }

    // 创建新用户
    const user = await this.userService.createUser({
      id,
      password,
      username: username || `user_${id}`,
    });

    // 生成 token
    const token = signJwt({ id: user.id }, "30m");

    this.setStatus(201);
    return { token, id: user.id, username: user.username! };
  }
}
