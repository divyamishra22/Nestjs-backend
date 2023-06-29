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
//import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
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
      
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule.forRoot({
    //      isGlobal:true,
    //      envFilePath: "local.env"
    //   })],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //      host: configService.get('HOST'),
    //     port: +configService.get('PORT'),
    //     username: configService.get('USERNAME'),
    //     password: configService.get('PASSWORD'),
    //     database: configService.get('DATABASE'),
    //     // entities: [UserEntity,PasswordEntity,SessionsEntity],
    //     synchronize: true,
    //   //    logger:'advanced-console',
    //   // logging: 'all',  
    //   }),
    //   inject: [ConfigService],
    // }),
    UsersModule,
    AuthModule,
    // prodmodule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
