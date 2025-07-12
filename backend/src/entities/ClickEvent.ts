import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Project } from './Project';

@Entity('click_events')
export class ClickEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  selector!: string;

  @Column()
  tag!: string;

  @Column()
  className!: string;

  @Column({ type: 'json', nullable: true })
  extraData?: any;

  @Column({ nullable: true })
  userId?: string;

  @Column('bigint')
  timestamp!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Project)
  project!: Project;
}
