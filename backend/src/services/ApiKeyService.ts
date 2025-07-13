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

  async listByProject(projectId: number): Promise<ApiKey[]> {
    return this.repo.find({
      where: { projectId },
      order: { createdAt: "DESC" },
    });
  }

  async toggleActive(id: number, status: "enabled" | "disabled"): Promise<void> {
    await this.repo.update({ id }, { status });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
