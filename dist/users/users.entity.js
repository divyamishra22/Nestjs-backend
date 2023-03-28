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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const password_entity_1 = require("../auth/password.entity");
const base_entity_1 = require("../commons/base.entity");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity extends base_entity_1.MooBaseEntity {
};
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 30, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 50, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 240, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => password_entity_1.PasswordEntity, (password) => password.user, {
        lazy: true,
        cascade: true,
    }),
    __metadata("design:type", password_entity_1.PasswordEntity)
], UserEntity.prototype, "userPassword", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('Users')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=users.entity.js.map