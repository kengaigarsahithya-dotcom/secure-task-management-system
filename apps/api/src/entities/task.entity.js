"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Task = class Task {
};
exports.Task = Task;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 'PENDING' }),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)('User', 'tasks', { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", Object)
], Task.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Task.prototype, "updatedAt", void 0);
exports.Task = Task = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Task);
