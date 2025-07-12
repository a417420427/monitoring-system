// services/ProjectService.ts
import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";
import { Repository } from "typeorm";

export class ProjectService {
  private repo: Repository<Project>;

  constructor() {
    this.repo = AppDataSource.getRepository(Project);
  }

  async create(data: Partial<Project>): Promise<Project> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findById(id: number): Promise<Project | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["user", "errors"],
    });
  }

  async findAllByUser(userId: number): Promise<Project[]> {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ["errors"],
      order: { createdAt: "DESC" },
    });
  }

  async findByAppId(appId: string): Promise<Project | null> {
    return this.repo.findOne({
      where: { appId },
      relations: ["errors"],
    });
  }

  async updateStatus(
    id: number,
    status: "active" | "inactive"
  ): Promise<Project | null> {
    const project = await this.repo.findOneBy({ id });
    if (!project) return null;
    project.status = status;
    return this.repo.save(project);
  }
}
