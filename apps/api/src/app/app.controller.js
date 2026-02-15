"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    healthCheck() {
        return { message: '🚀 API is running successfully!' };
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "healthCheck", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)() // 👈 remove 'api' here
], AppController);
