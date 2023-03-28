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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_services_1 = require("../auth/auth.services");
const user_repository_1 = require("./user.repository");
const users_entity_1 = require("./users.entity");
let UsersService = class UsersService {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async getUserByUsername(username) {
        return await this.userRepo.findOne({ where: { username } });
    }
    async getUserByUserId(userId) {
        return await this.userRepo.findOne({ where: { id: userId } });
    }
    async createUser(user, password) {
        const usernameAlreadyExists = await this.getUserByUsername(user.username);
        if (usernameAlreadyExists)
            throw new common_1.ConflictException('This username is already taken!');
        const newUser = await this.userRepo.save(user);
        await this.authService.createPasswordForNewUser(newUser.id, password);
        return newUser;
    }
    async updateUser(userId, newUserDetails) {
        const existingUser = await this.userRepo.findOne({
            where: { id: userId },
        });
        if (!existingUser) {
            return null;
        }
        if (newUserDetails.bio)
            existingUser.bio = newUserDetails.bio;
        if (newUserDetails.avatar)
            existingUser.avatar = newUserDetails.avatar;
        if (newUserDetails.name)
            existingUser.name = newUserDetails.name;
        if (newUserDetails.userPassword)
            existingUser.userPassword = newUserDetails.userPassword;
        return await this.userRepo.save(existingUser);
    }
    async delete(id, token) {
        const user = await this.authService.getUserFromSessionToken(token);
        if (user) {
            const deleteResult = await this.userRepo.delete({ id });
            return deleteResult.affected === 1;
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UserEntity)),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        auth_services_1.AuthService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.services.js.map