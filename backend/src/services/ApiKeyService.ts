import { AppDataSource } from "../data-source";
import { ApiKey } from "../entities/ApiKey";
import { Repository } from "typeorm";
import crypto from "crypto";

export class ApiKeyService {
  private repo: Repository<ApiKey>;

  constructor() {
    this.repo = AppDataSource.getRepository(ApiKey);
  }

  async generateKey(projectId: number, label?: string): Promise<ApiKey> {
    const key = "mon_" + crypto.randomBytes(24).toString("hex");
    const entry = this.repo.create({ key, projectId, label, status: "enabled" });
    return this.repo.save(entry);
  }

  async listByProject(projectId: number, page: number, size: number): Promise<[ApiKey[], number]> {
    const [data, total] = await this.repo.findAndCount({
      where: { projectId },
      order: { createdAt: "DESC" },
      skip: (page - 1) * size,
      take: size
    });

    return [data, total]
  }

  async toggleActive(id: number, status: "enabled" | "disabled"): Promise<void> {
    await this.repo.update({ id }, { status });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
