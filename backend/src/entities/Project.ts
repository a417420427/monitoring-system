// entities/Project.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ErrorLog } from "./ErrorLog";
import { User } from "./User";

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

  @Column({ type: "varchar", length: 32 })
  category!: "web" | "h5" | "miniapp" | "backend"; // 暂定分类

  @Column({ type: "enum", enum: ["active", "inactive"], default: "active" })
  status: "active" | "inactive";

  @OneToMany(() => ErrorLog, (error) => error.project)
  errors!: ErrorLog[];

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}
