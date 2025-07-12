import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity('error_logs')
export class ErrorLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string; // 'jsError', 'unhandledrejection'

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'text', nullable: true })
  stack?: string;

  @Column({ nullable: true })
  lineno?: number;

  @Column({ nullable: true })
  colno?: number;

  @Column({ nullable: true })
  userId?: string;

  @Column('bigint')
  timestamp!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Project, project => project.errors)
  project!: Project;
}
