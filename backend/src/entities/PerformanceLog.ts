import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("performance_logs")
export class PerformanceLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  projectId!: number;

  @Column()
  appId!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  referrer?: string;

  @Column("text")
  userAgent!: string;

  @Column({ nullable: true })
  ip?: string;

  @Column({ nullable: true })
  deviceType?: string;

  @Column({ nullable: true })
  os?: string;

  @Column({ nullable: true })
  browser?: string;

  @Column({ nullable: true })
  screen?: string;

  @Column({ nullable: true })
  lang?: string;

  @Column("json")
  metrics!: Record<string, number>;

  // Performance Metrics
  // @Column("float", { nullable: true }) dnsTime?: number;
  // @Column("float", { nullable: true }) tcpTime?: number;
  // @Column("float", { nullable: true }) sslTime?: number;
  // @Column("float", { nullable: true }) ttfb?: number;
  // @Column("float", { nullable: true }) responseTime?: number;
  // @Column("float", { nullable: true }) domParseTime?: number;
  // @Column("float", { nullable: true }) domContentLoadedTime?: number;
  // @Column("float", { nullable: true }) firstPaint?: number;
  // @Column("float", { nullable: true }) firstContentfulPaint?: number;
  // @Column("float", { nullable: true }) largestContentfulPaint?: number;
  // @Column("float", { nullable: true }) firstInputDelay?: number;
  // @Column("float", { nullable: true }) interactionToNextPaint?: number;
  // @Column("float", { nullable: true }) totalBlockingTime?: number;
  // @Column("float", { nullable: true }) loadTime?: number;

  @Column({ nullable: true })
  sessionId?: string;

  @CreateDateColumn()
  timestamp!: Date;
}
