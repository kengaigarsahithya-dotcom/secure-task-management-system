import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  action!: string;            // CREATE / UPDATE / DELETE

  @Column()
  entityType!: string;        // e.g. "Task"

  @Column({ nullable: true })
  entityId!: string;

  @Column({ nullable: true })
  performedBy!: string;       // user email

  @CreateDateColumn()
  timestamp!: Date;
}
