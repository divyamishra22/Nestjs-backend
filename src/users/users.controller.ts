import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
@Get('/username')
getUserByUserName(@Param() param): string{
    return `User of Name = ${param.username}`;          //backticks when taking values through @Param.
}
@Get('/userid')
getUserByUserId(@Param() param): string {
    return `User of id =${param.userid}`;    
}
@Delete('/userid')
deleteUser(@Param() param): string{
   return `Delete User of id = ${param.userid}`;
}
@Post('/username/userid')
CreateUser(@Param() param): string{
    return `User of ${param.username}, ${param.userid} created`;
}
@Patch('/username/userid')
UpdateUser(@Param() param): string{
    return `${param.Username} details updated`;
}


}