import { AppDataSource } from "../data-source";
import { FetchError } from "../entities/FetchError";
import { Repository } from "typeorm";

export class FetchErrorService {
  private repo: Repository<FetchError>;

  constructor() {
    this.repo = AppDataSource.getRepository(FetchError);
  }

  async create(data: Partial<FetchError>): Promise<FetchError> {
    const entry = this.repo.create(data);
    return this.repo.save(entry);
  }

  async findByProject(projectId: number): Promise<FetchError[]> {
    return this.repo.find({
      where: { project: { id: projectId } },
      order: { timestamp: "DESC" }
    });
  }
}
