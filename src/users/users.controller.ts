import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional, ApiTags } from '@nestjs/swagger/dist';
import { UserEntity } from './users.entity';
import { UsersService } from './users.services';



class UserCreateRequestBody {
    @ApiProperty() username: string;
    @ApiProperty() password: string;
    @ApiPropertyOptional() name?: string;
    @ApiPropertyOptional() avatar?: string;
    @ApiPropertyOptional() bio?: string;
  }
  class UserUpdateRequestBody {
    @ApiPropertyOptional() password?: string;
    @ApiPropertyOptional() name?: string;
    @ApiPropertyOptional() avatar?: string;
    @ApiPropertyOptional() bio?: string;
  }


@ApiTags('Users')
@Controller('users')
export class UsersController {
 constructor(private userService: UsersService) {}
@Get('/username')
 async getUserByUserName(@Param('username') username:string): Promise<any>{
    //return `User of Name = ${username}`;     //backticks when taking values through @Param.
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
}
@Get('/userId')
   async getUserByUserId(@Param('userId') userId:string): Promise<UserEntity> {
    //return `User of id =${userid}`; 
    const user = await this.userService.getUserByUserId(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;   
}
@Delete('/username')
 async deleteUser(@Param('username') username:string): Promise<any>{
   //return `Delete User of id = ${userid}`;
    const del = await this.userService.deleteUser(username);
    if(del)
    return `user deleted`;
    else{
      return `invalid request`;
    }
}
@Post('/username')
//CreateUser(@Param('username') username: string):string{
   // return `User of ${username} created`;
async createNewUser(@Body() createUserRequest: UserCreateRequestBody, password: string): Promise<UserEntity>{         
  const user = await this.userService.createUser(createUserRequest,password);
  return user;                                                     
   }



@Patch('/userId')
 async UpdateUser(
  @Param('userId') userId: string, 
 @Body() updateuserrequest:UserUpdateRequestBody):
 Promise<UserEntity>{
    const user = await this.userService.updateUser(userId,updateuserrequest);
    return user;
    //return `${username} details updated`;
}


}