import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/users.entity';
//import { UsersController } from './users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: 'localhost',
      //
      port: 5432,
      username: 'postgres',
      password: 'divya123',
      database: 'moodb',
      entities: [UserEntity],
      synchronize: true,
      logger:'advanced-console',
      logging: 'all',  
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
