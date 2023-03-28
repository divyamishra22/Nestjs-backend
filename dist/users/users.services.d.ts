import { AuthService } from "src/auth/auth.services";
import { UsersRepository } from "./user.repository";
import { UserEntity } from "./users.entity";
export declare class UsersService {
    private userRepo;
    private authService;
    constructor(userRepo: UsersRepository, authService: AuthService);
    getUserByUsername(username: string): Promise<UserEntity>;
    getUserByUserId(userId: string): Promise<UserEntity>;
    createUser(user: Partial<UserEntity>, password: string): Promise<UserEntity>;
    updateUser(userId: string, newUserDetails: Partial<UserEntity>): Promise<UserEntity>;
    delete(id: string, token: string): Promise<boolean>;
}
