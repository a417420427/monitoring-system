import { AppDataSource } from "../data-source";
import { PerformanceLog } from "../entities/PerformanceLog";
import { Repository } from "typeorm";

export class PerformanceService {
  private repo: Repository<PerformanceLog>;

  constructor() {
    this.repo = AppDataSource.getRepository(PerformanceLog);
  }

  // 单条创建
  async create(data: Partial<PerformanceLog>): Promise<PerformanceLog> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  // 批量创建
  async createMany(dataList: Partial<PerformanceLog>[]): Promise<PerformanceLog[]> {
    const entries = this.repo.create(dataList);
    return this.repo.save(entries);
  }

  // 根据 appId 查询最近的若干条
  async findRecentByAppId(appId: string, limit = 50): Promise<PerformanceLog[]> {
    return this.repo.find({
      where: { appId },
      order: { timestamp: "DESC" },
      take: limit,
    });
  }

  // 根据 projectId 查询全部（可考虑分页，示例简单返回全部）
  async findAllByProject(projectId: number): Promise<PerformanceLog[]> {
    return this.repo.find({
      where: { projectId },
      order: { timestamp: "DESC" },
    });
  }
}
