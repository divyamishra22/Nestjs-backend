import { MooBaseEntity } from "src/commons/base.entity";
import { UserEntity } from "src/users/users.entity";
export declare class PasswordEntity extends MooBaseEntity {
    userId: string;
    user: UserEntity;
    password: string;
}
