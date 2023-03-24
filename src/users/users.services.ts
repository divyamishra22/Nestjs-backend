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
}