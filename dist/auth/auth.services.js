"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../users/user.repository");
const users_entity_1 = require("../users/users.entity");
const typeorm_2 = require("typeorm");
const password_entity_1 = require("./password.entity");
const sessions_entity_1 = require("./sessions.entity");
let AuthService = class AuthService {
    constructor(userRepo, passwordRepo, sessionRepo) {
        this.userRepo = userRepo;
        this.passwordRepo = passwordRepo;
        this.sessionRepo = sessionRepo;
    }
    async createNewSession(username, password) {
        const user = await this.userRepo.findOne({ where: { username } });
        if (!user) {
            throw new common_1.NotFoundException('Username does not exist');
        }
        const userPassword = await this.passwordRepo.findOne({
            where: { userId: user.id },
        });
        if (password == userPassword.password) {
            const session = new sessions_entity_1.SessionsEntity();
            session.userId = userPassword.userId;
            const savedSession = await this.sessionRepo.save(session);
            return savedSession;
        }
        else {
            throw new common_1.UnauthorizedException('Password is wrong');
        }
    }
    async createPasswordForNewUser(userId, password) {
        const existing = await this.passwordRepo
            .findOne({ where: { userId } });
        if (existing) {
            throw new common_1.UnauthorizedException('This user already has a password, cannot set new password');
        }
        const newPassword = new password_entity_1.PasswordEntity();
        newPassword.userId = userId;
        newPassword.password = password;
        return await this.passwordRepo.save(newPassword);
    }
    async getUserFromSessionToken(token) {
        const session = await this.sessionRepo.findOne({ where: { id: token } });
        if (!session) {
            throw new common_1.UnauthorizedException('Session not found');
        }
        const user = await session.user;
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(password_entity_1.PasswordEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(sessions_entity_1.SessionsEntity)),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.services.js.map