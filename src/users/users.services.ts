import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.services";
import { PasswordEntity } from "src/auth/password.entity";
import { PasswordRepository } from "./passoword.repository";
//import { getConnection } from "typeorm";
import { UsersRepository } from "./user.repository"
import { UserEntity } from "./users.entity"


@Injectable()
export class UsersService {
constructor(@InjectRepository(UserEntity) private userRepo: UsersRepository,
@InjectRepository(PasswordEntity) private passRepo: PasswordRepository,
private authService: AuthService,) {}

 async getUserByUsername(username: string): Promise<UserEntity> {
      return await this.userRepo.findOne({ where: { username } });
    }
  
  public async getUserByUserId(userId: string): Promise<UserEntity> {
  //return await this.userRepo.findOne({ where: { id: userId } });
     const userid = await this.passRepo.findOne({where: {userId}});
    return await this.userRepo.findOne({where: {id : userid.id}});
}

public async createUser(user: Partial<UserEntity>,password: string): Promise<UserEntity> {
  //user.userPassword = new PasswordEntity();
  // user.userPassword.password = password;
  //return await this.userRepo.save(user);

const usernameAlreadyExists = await this.getUserByUsername(user.username);
if (usernameAlreadyExists)
  throw new ConflictException('This username is already taken!');

const newUser = await this.userRepo.save(user);

await this.authService.createPasswordForNewUser(newUser.id, password);
return newUser;
}

public async updateUser(
    userId: string,
    newUserDetails: Partial<UserEntity>,
  ): Promise<UserEntity> {
   const existingUser = await this.userRepo.findOne({
     where: { id: userId }, });
     if (!existingUser) {
      return null;
    }
    if (newUserDetails.bio) existingUser.bio = newUserDetails.bio;
    if (newUserDetails.avatar) existingUser.avatar = newUserDetails.avatar;
    if (newUserDetails.name) existingUser.name = newUserDetails.name;
    if (newUserDetails.userPassword) existingUser.userPassword = newUserDetails.userPassword;

    return await this.userRepo.save(existingUser);
  }

  public async deleteUser(username:string): Promise<any>{
     if(this.getUserByUsername(username)!== null){
       await this.userRepo
       .createQueryBuilder()
       .delete()
       .where("username = :username", { username: username}) }
    else{
      throw new NotFoundException('User not found');
    }
  }
}