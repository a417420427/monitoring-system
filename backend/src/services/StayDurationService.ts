import { AppDataSource } from "../data-source";
import { StayDuration } from "../entities/StayDuration";
import { Repository } from "typeorm";

export class StayDurationService {
  private repo: Repository<StayDuration>;

  constructor() {
    this.repo = AppDataSource.getRepository(StayDuration);
  }

  async create(data: Partial<StayDuration>): Promise<StayDuration> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findByProject(projectId: number): Promise<StayDuration[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      order: { timestamp: "DESC" }
    });
  }
}
