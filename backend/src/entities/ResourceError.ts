import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity('resource_errors')
export class ResourceError {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tagName!: string;

  @Column()
  src!: string;

  @Column({ nullable: true })
  userId?: string;

  @Column('bigint')
  timestamp!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Project)
  project!: Project;
}
