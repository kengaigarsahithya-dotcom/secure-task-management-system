import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { Organization } from './organization.entity';
import { UserRole } from '../auth/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    type: 'text',
    default: UserRole.VIEWER,
  })
  role!: UserRole;

  @OneToMany(() => Task, (task) => task.owner)
  tasks!: Task[];

  @ManyToOne(() => Organization, (org) => org.users, { onDelete: 'SET NULL' })
  organization!: Organization;
}
