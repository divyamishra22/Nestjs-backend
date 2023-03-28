import { PasswordEntity } from "src/auth/password.entity";
import { MooBaseEntity } from "src/commons/base.entity";
export declare class UserEntity extends MooBaseEntity {
    username: string;
    name: string;
    avatar: string;
    bio: string;
    userPassword: PasswordEntity;
}
