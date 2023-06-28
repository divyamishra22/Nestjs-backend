import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordEntity } from './auth/password.entity';
import { SessionsEntity } from './auth/sessions.entity';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/users.entity';
import { prodmodule } from './db.module';
//import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10000',
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
    AuthModule,
    // prodmodule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
