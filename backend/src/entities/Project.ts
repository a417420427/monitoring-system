// entities/Project.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ErrorLog } from "./ErrorLog";
import { User } from "./User";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 64, unique: true })
  appId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => ErrorLog, (error) => error.project)
  errors!: ErrorLog[];

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}
