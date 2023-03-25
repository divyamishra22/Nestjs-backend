import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "src/users/user.repository";
import { UserEntity } from "src/users/users.entity";
import { Repository } from "typeorm";
import { PasswordEntity } from "./password.entity";
import { SessionsEntity } from "./sessions.entity";
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: UsersRepository,
    @InjectRepository(PasswordEntity)
    private passwordRepo: Repository<PasswordEntity>,
    @InjectRepository(SessionsEntity)
   private sessionRepo: Repository<SessionsEntity>,
  ) {}

  async createNewSession(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Username does not exist');
    }
    const passMatch = await this.userRepo
    .createQueryBuilder("userPassword")
    .where("userPassword = userPassword", {userPassword: password})
    .getOne()
    //const passMatch = await this.matchPassHash(password, userPassword.password);
    if (!passMatch) {
      throw new UnauthorizedException('Password is wrong');
    }
    const session = new SessionsEntity();
    session.userId = username;
    const savedSession = await this.sessionRepo.save(session);
    return savedSession;
  } 
  async createPasswordForNewUser(
    username: string,
    password: string,
  ): Promise<PasswordEntity> {
    const existing = await this.userRepo
    .createQueryBuilder('user')
    .where('username= :username',{username: username})
    .getOne()
    if (existing) {
      throw new UnauthorizedException(
        'This user already has a password, cannot set new password',
      );
    }

    const newPassword = new PasswordEntity();
    newPassword.password = password;
    //newPassword.password = await this.passToHash(password);
    return await this.passwordRepo.save(newPassword);
  }
  
}