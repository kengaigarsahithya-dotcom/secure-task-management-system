"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_module_1 = require("./tasks/task.module");
const task_entity_1 = require("../entities/task.entity");
const user_entity_1 = require("../entities/user.entity");
const organization_entity_1 = require("../entities/organization.entity");
const auth_module_1 = require("../auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [user_entity_1.User, task_entity_1.Task, organization_entity_1.Organization],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            task_module_1.TaskModule,
        ],
    })
], AppModule);
