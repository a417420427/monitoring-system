import { AppDataSource } from "../data-source";
import { ResourceError } from "../entities/ResourceError";
import { Repository } from "typeorm";

export class ResourceErrorService {
  private repo: Repository<ResourceError>;

  constructor() {
    this.repo = AppDataSource.getRepository(ResourceError);
  }

  async create(data: Partial<ResourceError>): Promise<ResourceError> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findByProject(projectId: number): Promise<ResourceError[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      order: { timestamp: "DESC" }
    });
  }
}
