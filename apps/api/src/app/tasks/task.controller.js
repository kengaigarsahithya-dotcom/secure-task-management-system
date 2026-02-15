"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async findAll() {
        return this.taskService.findAll();
    }
    async create(body, req) {
        const user = req.user; // adjust if using auth later
        return this.taskService.create(body, user);
    }
};
exports.TaskController = TaskController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
exports.TaskController = TaskController = tslib_1.__decorate([
    (0, common_1.Controller)('tasks'),
    tslib_1.__metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
