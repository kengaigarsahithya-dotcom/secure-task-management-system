"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_log_entity_1 = require("../entities/audit-log.entity");
let AuditLogService = class AuditLogService {
    constructor(repo) {
        this.repo = repo;
    }
    async record(action, entityType, entityId, performedBy) {
        const log = this.repo.create({ action, entityType, entityId, performedBy });
        await this.repo.save(log);
    }
};
exports.AuditLogService = AuditLogService;
exports.AuditLogService = AuditLogService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], AuditLogService);
