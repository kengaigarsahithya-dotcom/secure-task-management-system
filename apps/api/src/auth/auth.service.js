"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
let AuthService = class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async register(dto) {
        const existing = await this.userRepo.findOne({ where: { email: dto.email } });
        if (existing) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({
            email: dto.email,
            passwordHash: hashedPassword,
        });
        return await this.userRepo.save(user);
    }
    async login(dto) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordValid) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        return { access_token: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
