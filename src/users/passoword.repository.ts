import { PasswordEntity } from "src/auth/password.entity";
import { Repository } from "typeorm";


export class PasswordRepository extends Repository<PasswordEntity> {}