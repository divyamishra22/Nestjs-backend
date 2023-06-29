import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordEntity } from './auth/password.entity';
import { SessionsEntity } from './auth/sessions.entity';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/users.entity';
// import { prodmodule } from './db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      //
      //  port: 5432,
       port: parseInt(process.env.PORT),
      // username: 'postgres',
      // password: 'divya123',
      // database: 'mydb',
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [UserEntity,PasswordEntity,SessionsEntity],
      synchronize: true,
      // logger:'advanced-console',
      // logging: 'all',  
    }),
      
    UsersModule,
    AuthModule,
    // prodmodule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
