import { MooBaseEntity } from "src/commons/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('Users')            //our users table will have these columns.
export class UserEntity extends MooBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar',{length:30})
  username: string;
 
  @Column('varchar',{length:50})
  name: string;

  @Column('varchar')
  avatar: string;

  @Column('varchar',{length:240})
  bio: string;
}