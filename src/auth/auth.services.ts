import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "src/users/user.repository";
import { UserEntity } from "src/users/users.entity";
import { Repository } from "typeorm";
import { PasswordEntity } from "./password.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: UsersRepository,
    @InjectRepository(PasswordEntity)
    private passwordRepo: Repository<PasswordEntity>,
    //@InjectRepository(SessionsEntity)
   // private sessionRepo: Repository<SessionsEntity>,
  ) {}
  
  
}