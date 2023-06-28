import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";



@Global()
@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        url:  'postgresql://postgres:divya123@127.0.0.1:5432/mydb',
      }),
   
    ],
   
  })
  export class prodmodule {}