import { UserEntity } from './users.entity';
import { UsersService } from './users.services';
declare class UserCreateRequestBody {
    username: string;
    password: string;
    name?: string;
    avatar?: string;
    bio?: string;
}
declare class UserUpdateRequestBody {
    password?: string;
    name?: string;
    avatar?: string;
    bio?: string;
}
declare class DeleteRequestBody {
    Id: string;
    token: string;
}
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUserByUserName(username: string): Promise<any>;
    getUserByUserId(userId: string): Promise<UserEntity>;
    createNewUser(createUserRequest: UserCreateRequestBody): Promise<UserEntity>;
    UpdateUser(userId: string, updateuserrequest: UserUpdateRequestBody): Promise<UserEntity>;
    deletePost(deleteRequestBody: DeleteRequestBody): Promise<{
        id: string;
        deleted: boolean;
    }>;
}
export {};
