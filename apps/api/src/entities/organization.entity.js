"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Organization = class Organization {
};
exports.Organization = Organization;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization, (org) => org.children, { nullable: true, onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", Object)
], Organization.prototype, "parentOrg", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Organization, (org) => org.parentOrg),
    tslib_1.__metadata("design:type", Array)
], Organization.prototype, "children", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.organization),
    tslib_1.__metadata("design:type", Array)
], Organization.prototype, "users", void 0);
exports.Organization = Organization = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Organization);
