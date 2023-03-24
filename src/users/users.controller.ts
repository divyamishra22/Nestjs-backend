import { Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { UserEntity } from './users.entity';
import { UsersService } from './users.services';
@ApiTags('Users')
@Controller('users')


export class UsersController {
 constructor(private userService: UsersService) {}
@Get('/username')
 async getUserByUserName(@Param('username') username:string): Promise<UserEntity>{
    //return `User of Name = ${username}`;     //backticks when taking values through @Param.
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
}
@Get('/userid')
   async getUserByUserId(@Param('userid') userid:string): Promise<UserEntity> {
    //return `User of id =${userid}`; 
    const user = await this.userService.getUserByUserId(userid);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;   
}
@Delete('/userid')
deleteUser(@Param('userid') userid:string): string{
   return `Delete User of id = ${userid}`;
}
@Post('/username')
CreateUser(@Param('username') username: string):string{
    return `User of ${username} created`;
}
@Patch('/username')
UpdateUser(@Param('username') username:string): string{
    return `${username} details updated`;
}


}