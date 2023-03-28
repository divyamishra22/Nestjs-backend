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
exports.RequiredAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_services_1 = require("./auth.services");
let TokenAuthorizer = class TokenAuthorizer {
    constructor(authService) {
        this.authService = authService;
    }
    async authorizeToken(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        if (!((_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
            throw new common_1.UnauthorizedException('Missing authorization header');
        }
        if (!request.headers.authorization.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Invalid authorization header');
        }
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Missing token');
        }
        const user = this.authService.getUserFromSessionToken(token);
        request.user = user;
        return true;
    }
};
TokenAuthorizer = __decorate([
    __param(0, (0, common_1.Inject)(auth_services_1.AuthService)),
    __metadata("design:paramtypes", [auth_services_1.AuthService])
], TokenAuthorizer);
let RequiredAuthGuard = class RequiredAuthGuard extends TokenAuthorizer {
    async canActivate(context) {
        return this.authorizeToken(context);
    }
};
RequiredAuthGuard = __decorate([
    (0, common_1.Injectable)()
], RequiredAuthGuard);
exports.RequiredAuthGuard = RequiredAuthGuard;
//# sourceMappingURL=auth.guard.js.map