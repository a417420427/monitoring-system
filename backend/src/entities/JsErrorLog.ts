import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Project } from "./Project";

@Entity("js_error_log")
export class JsErrorLog {
  @PrimaryGeneratedColumn()
  id!: number;
  url!: string
  // 用户 & 环境基础信息
  @Column() projectId?: number;
  @Column({ nullable: true }) lang?: string;
  @Column("text") userAgent!: string;
  @Column({ nullable: true }) os?: string;
  @Column({ nullable: true }) browser?: string;
  @Column({ nullable: true }) deviceType?: string;
  @Column({ nullable: true }) ip?: string;
  @Column({ nullable: true }) country?: string;
  @Column({ nullable: true }) region?: string;
  @Column({ nullable: true }) city?: string;

  @Column("text", { nullable: true }) 
  message?: string;
  // 性能指标：统一存放 payload
  @Column("json", { nullable: true })
  payload?: Record<string, number>;

  // 上报时间戳（前端上报的）
  @Column("bigint", { nullable: true })
  clientTimestamp?: number;

  @ManyToOne(() => Project)
  project!: Project;

  // 服务端接收时间
  @CreateDateColumn()
  createdAt!: Date;
}
