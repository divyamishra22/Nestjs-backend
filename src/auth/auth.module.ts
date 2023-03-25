import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/users/users.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { PasswordEntity } from "./password.entity";


@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PasswordEntity,
      //SessionsEntity,
      UserEntity,
      PasswordEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
