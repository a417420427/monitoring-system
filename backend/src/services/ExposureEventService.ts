import { AppDataSource } from "../data-source";
import { ExposureEvent } from "../entities/ExposureEvent";
import { Repository } from "typeorm";

export class ExposureEventService {
  private repo: Repository<ExposureEvent>;

  constructor() {
    this.repo = AppDataSource.getRepository(ExposureEvent);
  }

  async create(data: Partial<ExposureEvent>): Promise<ExposureEvent> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findByProject(projectId: number): Promise<ExposureEvent[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      order: { timestamp: "DESC" }
    });
  }
}
