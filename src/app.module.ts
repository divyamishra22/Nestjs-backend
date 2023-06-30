import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordEntity } from './auth/password.entity';
import { SessionsEntity } from './auth/sessions.entity';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/users.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

require('dotenv').config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'postgres',
      //host: 'localhost'
      //  port: 5432,
      //  username: 'postgres',
      //  password: 'divya123',
      //  database: 'mydb',
      //entities: [UserEntity,PasswordEntity,SessionsEntity],
      // synchronize: true,
      //  logger:'advanced-console',
      //  logging: 'all', 
      type: 'postgres' ,
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    }),
      
    UsersModule,
    AuthModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
