import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
//import { UsersRepository } from "./user.repository";
import { UsersController } from "./users.controller";
import { UserEntity } from "./users.entity";
import { UsersService } from "./users.services";

@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
  })
  export class UsersModule {}
  