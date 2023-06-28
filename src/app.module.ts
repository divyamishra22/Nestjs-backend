import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordEntity } from './auth/password.entity';
import { SessionsEntity } from './auth/sessions.entity';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/users.entity';
//import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      //
      port: 5432,
      username: 'postgres',
      password: 'divya123',
      database: 'mydb',
      entities: [UserEntity,PasswordEntity,SessionsEntity],
      synchronize: true,
      logger:'advanced-console',
      logging: 'all',  
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
