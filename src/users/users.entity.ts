import { MooBaseEntity } from "src/commons/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('Users')            //our users table will have these columns.
export class User extends MooBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string',{length:30})
  username:string;
 
  @Column('string',{length:50})
  name: string;

  @Column('string')
  avatar: string;

  @Column('string',{length:240})
  bio: string;
}