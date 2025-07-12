import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import {
  errorResponse,
  ServiceResponse,
  successResponse,
} from "./ResponseService";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepo.findOneBy({ id });
  }

  async getUserByUserName(username: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ username });
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ email });
  }

  async getUserByUserNameOrEmail(identifier: string): Promise<User | null> {
    return await this.userRepo.findOne({
      where: [{ username: identifier }, { email: identifier }],
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    username: string;
    wechatOpenid?: string;
  }): Promise<ServiceResponse<User | null>> {
    const { email, password, username } = data;

    // 检查邮箱是否存在
    const existMail = await this.getUserByEmail(email);
    if (existMail) {
      return errorResponse("邮箱已注册");
    }

    // 检查邮箱是否存在
    const existUsername = await this.getUserByUserName(username);
    if (existUsername) {
      return errorResponse("用户名已注册");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      passwordHash,
      username,
    });

    const savedUser = await this.userRepo.save(user);
    return successResponse(savedUser, "用户创建成功");
  }

  async verifyUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash!);
    if (!isValid) return null;

    // 登录成功，更新 lastLoginAt
    user.lastLoginAt = new Date();
    await this.userRepo.save(user);

    return user;
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepo.update(id, updateData);
    const updatedUser = await this.getUserById(id);
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  }
}
