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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/swagger/dist");
const auth_guard_1 = require("../auth/auth.guard");
const users_services_1 = require("./users.services");
class UserCreateRequestBody {
}
__decorate([
    (0, dist_1.ApiProperty)(),
    __metadata("design:type", String)
], UserCreateRequestBody.prototype, "username", void 0);
__decorate([
    (0, dist_1.ApiProperty)(),
    __metadata("design:type", String)
], UserCreateRequestBody.prototype, "password", void 0);
__decorate([
    (0, dist_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserCreateRequestBody.prototype, "name", void 0);
__decorate([
    (0, dist_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserCreateRequestBody.prototype, "avatar", void 0);
__decorate([
    (0, dist_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserCreateRequestBody.prototype, "bio", void 0);
class UserUpdateRequestBody {
}
__decorate([
    (0, dist_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserUpdateRequestBody.prototype, "password", void 0);
__decorate([
    (0, dist_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserUpdateRequestBody.prototype, "name", void 0);
__decorate([
    (0, dist_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserUpdateRequestBody.prototype, "avatar", void 0);
__decorate([
    (0, dist_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UserUpdateRequestBody.prototype, "bio", void 0);
class DeleteRequestBody {
}
__decorate([
    (0, dist_1.ApiProperty)(),
    __metadata("design:type", String)
], DeleteRequestBody.prototype, "Id", void 0);
__decorate([
    (0, dist_1.ApiProperty)(),
    __metadata("design:type", String)
], DeleteRequestBody.prototype, "token", void 0);
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserByUserName(username) {
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getUserByUserId(userId) {
        const user = await this.userService.getUserByUserId(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async createNewUser(createUserRequest) {
        const user = await this.userService.createUser(createUserRequest, createUserRequest.password);
        return user;
    }
    async UpdateUser(userId, updateuserrequest) {
        const user = await this.userService.updateUser(userId, updateuserrequest);
        return user;
    }
    async deletePost(deleteRequestBody) {
        const deletedPost = {
            id: deleteRequestBody.Id,
            deleted: await this.userService.delete(deleteRequestBody.Id, deleteRequestBody.token),
        };
        return deletedPost;
    }
};
__decorate([
    (0, common_1.Get)('/@:username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByUserName", null);
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByUserId", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserCreateRequestBody]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createNewUser", null);
__decorate([
    (0, common_1.Patch)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UserUpdateRequestBody]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "UpdateUser", null);
__decorate([
    (0, dist_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.RequiredAuthGuard),
    (0, common_1.Delete)('/:Id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteRequestBody]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deletePost", null);
UsersController = __decorate([
    (0, dist_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_services_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map