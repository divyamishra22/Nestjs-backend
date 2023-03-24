import { Repository } from "typeorm";
import { UserEntity } from "./users.entity"; // repository ..by which data is fetched from databases

export class UsersRepository extends Repository<UserEntity> {}
