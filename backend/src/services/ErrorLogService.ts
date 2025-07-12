import { AppDataSource } from "../data-source";
import { ErrorLog } from "../entities/ErrorLog";
import { Repository } from "typeorm";

export class ErrorLogService {
  private repo: Repository<ErrorLog>;

  constructor() {
    this.repo = AppDataSource.getRepository(ErrorLog);
  }

  async create(data: Partial<ErrorLog>): Promise<ErrorLog> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findRecentByAppId(id: number, limit = 50): Promise<ErrorLog[]> {
    return this.repo.find({
      where: { id },
      order: { timestamp: "DESC" },
      take: limit
    });
  }

  async findAllByProject(projectId: number): Promise<ErrorLog[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      order: { timestamp: "DESC" }
    });
  }
}
