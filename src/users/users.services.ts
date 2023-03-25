import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PasswordEntity } from "src/auth/password.entity";
//import { getConnection } from "typeorm";
import { UsersRepository } from "./user.repository"
import { UserEntity } from "./users.entity"


@Injectable()
export class UsersService {
constructor(@InjectRepository(UserEntity) private userRepo: UsersRepository) {}

 async getUserByUsername(username: string): Promise<UserEntity> {
    //return  await this.userRepo.findOne({ where: { username } });
   const user = await this.userRepo
    .createQueryBuilder("user")
    .where("user.username = :username", { username: username})
    .getOne()
    if(user){
    return user;}
    else{
      return null;
    }
  }
  public async getUserByUserId(id: string): Promise<UserEntity> {
  //return await this.userRepo.findOne({ where: { id: userId } });
  const user = await this.userRepo
    .createQueryBuilder("user")
    .where("user.id = :id", { id: id})
    .getOne()
    if(user){
    return user;}
    else{
      return null;
    }
}

public async createUser(user: Partial<UserEntity>,password: string): Promise<UserEntity> {
  user.userPassword = new PasswordEntity();
   user.userPassword.password = password;
  return await this.userRepo.save(user);
}

public async updateUser(
    userId: string,
    newUserDetails: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const existingUser = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return null;
    }
    if (newUserDetails.bio) existingUser.bio = newUserDetails.bio;
    if (newUserDetails.avatar) existingUser.avatar = newUserDetails.avatar;
    if (newUserDetails.name) existingUser.name = newUserDetails.name;

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