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
exports.SessionsEntity = void 0;
const base_entity_1 = require("../commons/base.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let SessionsEntity = class SessionsEntity extends base_entity_1.MooBaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SessionsEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UserEntity, { lazy: true }),
    __metadata("design:type", Promise)
], SessionsEntity.prototype, "user", void 0);
SessionsEntity = __decorate([
    (0, typeorm_1.Entity)('sessions')
], SessionsEntity);
exports.SessionsEntity = SessionsEntity;
//# sourceMappingURL=sessions.entity.js.map