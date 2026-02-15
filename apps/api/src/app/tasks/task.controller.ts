import { Controller, Get, Post, Body, Request, Put, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() body: Partial<Task>, @Request() req: any): Promise<Task> {
    const user = req.user as User; // adjust if using auth later
    return this.taskService.create(body, user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.taskService.remove(id);
    return { deleted: true };
  }
}
