import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Project } from "./Project";

@Entity("performance_logs")
export class PerformanceLog {
  @PrimaryGeneratedColumn()
  id!: number;

  // 基本信息
  @Column() projectId!: number;
  @Column() appId!: string;
  @Column() url!: string;
  @Column({ nullable: true }) referrer?: string;

  // 用户 & 设备信息
  @Column({ nullable: true }) userId?: string;
  @Column({ nullable: true }) sessionId?: string;
  @Column({ nullable: true }) ip?: string;
  @Column({ nullable: true }) country?: string;
  @Column({ nullable: true }) region?: string;
  @Column({ nullable: true }) city?: string;
  @Column("text") userAgent!: string;
  @Column({ nullable: true }) deviceType?: string;
  @Column({ nullable: true }) os?: string;
  @Column({ nullable: true }) browser?: string;
  @Column({ nullable: true }) screen?: string;
  @Column({ nullable: true }) lang?: string;

  // 网络信息
  @Column({ nullable: true }) networkType?: string;
  @Column("float", { nullable: true }) dnsTime?: number;
  @Column("float", { nullable: true }) tcpTime?: number;
  @Column("float", { nullable: true }) sslTime?: number;
  @Column("float", { nullable: true }) ttfb?: number;
  @Column("float", { nullable: true }) responseTime?: number;

  // 页面性能指标
  @Column("float", { nullable: true }) fp?: number;
  @Column("float", { nullable: true }) fcp?: number;
  @Column("float", { nullable: true }) lcp?: number;
  @Column("float", { nullable: true }) fid?: number;
  @Column("float", { nullable: true }) cls?: number;
  @Column("float", { nullable: true }) tbt?: number;
  @Column("float", { nullable: true }) loadTime?: number;
  @Column("float", { nullable: true }) domContentLoadedTime?: number;
  @Column("float", { nullable: true }) domParseTime?: number;
  @Column("float", { nullable: true }) interactionToNextPaint?: number;

  // 用户行为扩展
  @Column("float", { nullable: true }) pageStayTime?: number;
  @Column({ nullable: true }) isJump?: boolean;
  @Column({ nullable: true }) isError?: boolean;
  @Column("text", { nullable: true }) errorMessage?: string;

  // 通用 JSON 扩展
  @Column("json", { nullable: true }) metrics?: Record<string, number | string>;

  @CreateDateColumn()
  timestamp!: Date;

  @ManyToOne(() => Project)
  project!: Project;
}

/**
 * {
  "projectId": 1,
  "url": "/home",
  "userId": "u-123",
  "deviceType": "mobile",
  "os": "iOS 17",
  "browser": "Safari",
  "networkType": "4G",
  "country": "China",
  "fcp": 1234,
  "lcp": 2456,
  "fid": 48,
  "cls": 0.05,
  "ttfb": 180,
  "loadTime": 3200,
  "pageStayTime": 56000,
  "metrics": {
    "fp": 1100,
    "domParseTime": 300,
    "interactionToNextPaint": 180
  }
}

 */
