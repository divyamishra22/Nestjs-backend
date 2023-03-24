import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
@ApiTags('Users')
@Controller('users')
export class UsersController {
@Get('/username')
getUserByUserName(@Param('username') username:string): string{
    return `User of Name = ${username}`;          //backticks when taking values through @Param.
}
@Get('/userid')
getUserByUserId(@Param('userid') userid:string): string {
    return `User of id =${userid}`;    
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