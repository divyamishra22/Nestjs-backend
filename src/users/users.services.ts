import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./user.repository"
import { UserEntity } from "./users.entity"


@Injectable()
export class UsersService {
constructor(@InjectRepository(UserEntity) private userRepo: UsersRepository) {}

 async getUserByUsername(username: string): Promise<UserEntity> {
    return  await this.userRepo.findOne({ where: { username } });
  }
  public async getUserByUserId(userId: string): Promise<UserEntity> {
  return await this.userRepo.findOne({ where: { id: userId } });
}
public async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
  return await this.userRepo.create(user);
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
}