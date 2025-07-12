import { AppDataSource } from "../data-source";
import { PerformanceLog } from "../entities/PerformanceLog";
import { Repository } from "typeorm";

export class PerformanceService {
  private repo: Repository<PerformanceLog>;

  constructor() {
    this.repo = AppDataSource.getRepository(PerformanceLog);
  }

  async create(data: Partial<PerformanceLog>): Promise<PerformanceLog> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findRecentByAppId(appId: string, limit = 50): Promise<PerformanceLog[]> {
    return this.repo.find({
      where: { appId },
      order: { timestamp: "DESC" },
      take: limit
    });
  }

  async findAllByProject(projectId: number): Promise<PerformanceLog[]> {
    return this.repo.find({
      where: { projectId },
      order: { timestamp: "DESC" }
    });
  }
}
