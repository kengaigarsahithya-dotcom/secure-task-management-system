import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async getTasks(user: User) {
    return this.taskRepo.find({
      where: { owner: user },
      relations: ['owner'],
    });
  }

  async createTask(title: string, description: string, user: User) {
    const task = this.taskRepo.create({
      title,
      description,
      owner: user,
    });
    return this.taskRepo.save(task);
  }

  async updateTask(id: string, updates: Partial<Task>) {
    await this.taskRepo.update(id, updates);
    return this.taskRepo.findOne({ where: { id } });
  }

  async deleteTask(id: string) {
    return this.taskRepo.delete(id);
  }
}
