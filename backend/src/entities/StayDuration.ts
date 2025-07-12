import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity('stay_durations')
export class StayDuration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column()
  duration!: number; // in seconds

  @Column({ nullable: true })
  userId?: string;

  @Column('bigint')
  timestamp!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Project)
  project!: Project;
}
