"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_log_entity_1 = require("../entities/audit-log.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
let AuditLogController = class AuditLogController {
    constructor(repo) {
        this.repo = repo;
    }
    async getAllLogs() {
        return this.repo.find({ order: { timestamp: 'DESC' } });
    }
};
exports.AuditLogController = AuditLogController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.ADMIN),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLogController.prototype, "getAllLogs", null);
exports.AuditLogController = AuditLogController = tslib_1.__decorate([
    (0, common_1.Controller)('audit-log'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], AuditLogController);
