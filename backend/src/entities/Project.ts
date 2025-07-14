// entities/Project.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { PerformanceLog } from "./PerformanceLog";
import { ApiKey } from "./ApiKey";
import { JsErrorLog } from "./JsErrorLog";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 64, unique: true })
  appId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: "varchar", length: 32 })
  category!: "web" | "h5" | "miniapp" | "backend"; // 暂定分类

  @Column({ type: "enum", enum: ["active", "inactive"], default: "active" })
  status: "active" | "inactive";

  @OneToMany(() => JsErrorLog, (error) => error.project)
  errors!: JsErrorLog[];


  @OneToMany(() => PerformanceLog, (performance) => performance.project)
  performanceLog!: PerformanceLog[];


  @OneToMany(() => ApiKey, (performance) => performance.project)
  apiKeys?: ApiKey[];

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}
