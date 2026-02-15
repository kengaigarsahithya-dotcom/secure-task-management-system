"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const organization_entity_1 = require("./organization.entity");
const user_role_enum_1 = require("../auth/user-role.enum");
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: user_role_enum_1.UserRole.VIEWER,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.owner),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "tasks", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => organization_entity_1.Organization, (org) => org.users, { onDelete: 'SET NULL' }),
    tslib_1.__metadata("design:type", organization_entity_1.Organization)
], User.prototype, "organization", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], User);
