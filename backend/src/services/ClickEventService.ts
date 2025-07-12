import { AppDataSource } from "../data-source";
import { ClickEvent } from "../entities/ClickEvent";
import { Repository } from "typeorm";

export class ClickEventService {
  private repo: Repository<ClickEvent>;

  constructor() {
    this.repo = AppDataSource.getRepository(ClickEvent);
  }

  async create(data: Partial<ClickEvent>): Promise<ClickEvent> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findByProject(projectId: number): Promise<ClickEvent[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      order: { timestamp: "DESC" }
    });
  }
}
