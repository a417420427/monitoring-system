import { AppDataSource } from "../data-source";
import { PerformanceLog } from "../entities/PerformanceLog";
import { Repository } from "typeorm";

interface LogQueryFilters {
  page: number;
  size: number;
  projectId?: number;
  url?: string;
  deviceType?: string;
  os?: string;
  browser?: string;
  country?: string;
  startTime?: string;
  endTime?: string;
}

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
  async createMany(
    dataList: Partial<PerformanceLog>[]
  ): Promise<PerformanceLog[]> {
    const entries = this.repo.create(dataList);
    return this.repo.save(entries);
  }

  public async findWithFilters(
    filters: LogQueryFilters
  ): Promise<[PerformanceLog[], number]> {
    const query = this.repo
      .createQueryBuilder("log")
      

    if(filters.projectId) {
      query.andWhere("log.projectId = :projectId", { projectId: filters.projectId });
    }

    if (filters.url) {
      query.andWhere("log.url LIKE :url", { url: `%${filters.url}%` });
    }
    if (filters.deviceType) {
      query.andWhere("log.deviceType = :deviceType", {
        deviceType: filters.deviceType,
      });
    }
    if (filters.os) {
      query.andWhere("log.os = :os", { os: filters.os });
    }
    if (filters.browser) {
      query.andWhere("log.browser = :browser", { browser: filters.browser });
    }
    if (filters.country) {
      query.andWhere("log.country = :country", { country: filters.country });
    }
    if (filters.startTime) {
      query.andWhere("log.clientTimestamp >= :startTime", {
        startTime: new Date(filters.startTime),
      });
    }
    if (filters.endTime) {
      query.andWhere("log.clientTimestamp <= :endTime", {
        endTime: new Date(filters.endTime),
      });
    }

    query.orderBy("log.clientTimestamp", "DESC").take(filters.size).skip((filters.page - 1) * filters.size);

    return await query.getManyAndCount();
  }
}
