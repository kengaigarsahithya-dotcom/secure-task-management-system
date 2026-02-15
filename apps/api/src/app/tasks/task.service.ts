import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find({ relations: ['owner'] });
  }

  async create(taskData: Partial<Task>, user: User): Promise<Task> {
    const task = this.taskRepo.create({ ...taskData, owner: user });
    return this.taskRepo.save(task);
  }

  async update(id: string, data: Partial<Task>): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.status !== undefined) task.status = data.status;

    return this.taskRepo.save(task);
  }

  async remove(id: string): Promise<void> {
    const res = await this.taskRepo.delete(id);
    if (!res.affected) throw new NotFoundException('Task not found');
  }
}
