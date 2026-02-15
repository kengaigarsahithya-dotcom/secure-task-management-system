"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("../../entities/task.entity");
const task_service_1 = require("./task.service");
const task_controller_1 = require("./task.controller");
const user_entity_1 = require("../../entities/user.entity");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task, user_entity_1.User])],
        controllers: [task_controller_1.TaskController],
        providers: [task_service_1.TaskService],
        exports: [task_service_1.TaskService],
    })
], TaskModule);
