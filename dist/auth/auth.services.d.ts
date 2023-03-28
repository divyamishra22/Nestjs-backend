import { UsersRepository } from "src/users/user.repository";
import { UserEntity } from "src/users/users.entity";
import { Repository } from "typeorm";
import { PasswordEntity } from "./password.entity";
import { SessionsEntity } from "./sessions.entity";
export declare class AuthService {
    private userRepo;
    private passwordRepo;
    private sessionRepo;
    constructor(userRepo: UsersRepository, passwordRepo: Repository<PasswordEntity>, sessionRepo: Repository<SessionsEntity>);
    createNewSession(username: string, password: string): Promise<SessionsEntity>;
    createPasswordForNewUser(userId: string, password: string): Promise<PasswordEntity>;
    getUserFromSessionToken(token: string): Promise<UserEntity>;
}
