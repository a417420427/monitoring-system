import { AppDataSource } from "../data-source";
import { ResourceErrorLog } from "../entities/ResourceErrorLog";
import { Repository } from "typeorm";
import { ServiceResponseWithPage, successPageResponse } from "./ResponseService";

interface LogQueryFilters {
  projectId?: number;
  url?: string;
  deviceType?: string;
  os?: string;
  browser?: string;
  country?: string;
  startTime?: string;
  endTime?: string;
  page: number
  size: number
}

export class ResourceErrorLogService {
  private repo: Repository<ResourceErrorLog>;

  constructor() {
    this.repo = AppDataSource.getRepository(ResourceErrorLog);
  }

  // 单条创建
  async create(data: Partial<ResourceErrorLog>): Promise<ResourceErrorLog> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  // 批量创建
  async createMany(
    dataList: Partial<ResourceErrorLog>[]
  ): Promise<ResourceErrorLog[]> {
    const entries = this.repo.create(dataList);
    return this.repo.save(entries);
  }

  public async findWithFilters(
    filters: LogQueryFilters
  ): Promise<[ResourceErrorLog[], number]> {
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
     const take = Number(filters.size); // 每页数量
      const skip = (Math.max(1, Number(filters.page)) - 1) * take; // 防止负页

    query.orderBy("log.clientTimestamp", "DESC").skip(skip).take(take)
    const [data, total] = await query.getManyAndCount()
  
    return [data, total]
  }
}
