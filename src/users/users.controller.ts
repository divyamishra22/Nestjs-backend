import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger/dist';
import { UserEntity } from './users.entity';
import { UsersService } from './users.services';



class UserCreateRequestBody {
    @ApiProperty() username: string;
    @ApiProperty() password: string;
    @ApiPropertyOptional() name?: string;
    @ApiPropertyOptional() avatar?: string;
    @ApiPropertyOptional() bio?: string;
  }


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
//CreateUser(@Param('username') username: string):string{
   // return `User of ${username} created`;
    createNewUser(@Body() createUserRequest: UserCreateRequestBody,): string{         //createuserrequest
             return `User created`;                                                 //shows input reqtype.
   }

@Patch('/username')
UpdateUser(@Param('username') username:string): string{
    return `${username} details updated`;
}


}