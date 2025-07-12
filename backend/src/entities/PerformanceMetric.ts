import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity('performance_metrics')
export class PerformanceMetric {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // 'fp', 'ttfb', 'domContentLoaded', etc.

  @Column('float')
  value!: number;

  @Column({ nullable: true })
  userId?: string;

  @Column('bigint')
  timestamp!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Project)
  project!: Project;
}
