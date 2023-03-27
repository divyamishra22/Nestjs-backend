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
    const userPassword = await this.passwordRepo.findOne({
      where: { userId: user.id },
    });
    // const passMatch = await this.matchPassHash(password, userPassword.password);
    // if (!passMatch) {
    //   throw new UnauthorizedException('Password is wrong');
    // }
    if(password == userPassword.password){
    const session = new SessionsEntity();
    session.userId = userPassword.userId;
    const savedSession = await this.sessionRepo.save(session);
    return savedSession;}
    else{
      throw new UnauthorizedException('Password is wrong');
    }
  }


  async createPasswordForNewUser(
    userId: string,
    password: string,
  ): Promise<PasswordEntity> {
    const existing = await this.passwordRepo
    .findOne({where: { userId }})
    if (existing) {
      throw new UnauthorizedException(
        'This user already has a password, cannot set new password');
    }
    const newPassword = new PasswordEntity();
    newPassword.userId = userId;
    newPassword.password = password;
    //newPassword.password = await this.passToHash(password);
    return await this.passwordRepo.save(newPassword);
  }

  // private async matchPassHash(
  //   password: string,
  //   hash: string,
  // ): Promise<boolean> {
  //   return (await compare(password, hash)) === true;
  // }
  
}