"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../../entities/task.entity");
let TaskService = class TaskService {
    constructor(taskRepo) {
        this.taskRepo = taskRepo;
    }
    async findAll() {
        return this.taskRepo.find({ relations: ['owner'] });
    }
    async create(taskData, user) {
        const task = this.taskRepo.create({ ...taskData, owner: user });
        return this.taskRepo.save(task);
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
