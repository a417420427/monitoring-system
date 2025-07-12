import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity('fetch_errors')
export class FetchError {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column({ nullable: true })
  status?: number;

  @Column({ type: 'text', nullable: true })
  error?: string;

  @Column('float')
  duration!: number;

  @Column({ nullable: true })
  userId?: string;

  @Column('bigint')
  timestamp!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Project)
  project!: Project;
}
