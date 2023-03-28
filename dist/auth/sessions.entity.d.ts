import { MooBaseEntity } from "src/commons/base.entity";
import { UserEntity } from "src/users/users.entity";
export declare class SessionsEntity extends MooBaseEntity {
    userId: string;
    user: Promise<UserEntity>;
}
