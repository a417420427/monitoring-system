import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Project } from './Project';

@Entity('api_keys')
export class ApiKey {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  projectId!: number;

  @Column({ unique: true })
  key!: string;

  @Column({ default: true })
  status!: 'enabled' | 'disabled';

  @Column({ nullable: true })
  label?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;


    @ManyToOne(() => Project)
    project!: Project;
}