import { AppDataSource } from "../data-source";
import { PageView } from "../entities/PageView";
import { Repository } from "typeorm";

export class PageViewService {
  private repo: Repository<PageView>;

  constructor() {
    this.repo = AppDataSource.getRepository(PageView);
  }

  async create(data: Partial<PageView>): Promise<PageView> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findByProject(projectId: number): Promise<PageView[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      order: { timestamp: "DESC" }
    });
  }
}
