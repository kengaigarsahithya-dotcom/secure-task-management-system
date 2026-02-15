"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const task_entity_1 = require("../../entities/task.entity");
let TaskService = class TaskService {
    constructor(taskRepo) {
        this.taskRepo = taskRepo;
    }
    async getTasks(user) {
        return this.taskRepo.find({
            where: { owner: user },
            relations: ['owner'],
        });
    }
    async createTask(title, description, user) {
        const task = this.taskRepo.create({
            title,
            description,
            owner: user,
        });
        return this.taskRepo.save(task);
    }
    async updateTask(id, updates) {
        await this.taskRepo.update(id, updates);
        return this.taskRepo.findOne({ where: { id } });
    }
    async deleteTask(id) {
        return this.taskRepo.delete(id);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(task_entity_1.Task)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository])
], TaskService);
