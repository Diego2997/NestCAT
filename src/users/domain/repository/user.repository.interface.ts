import { CreateUserDto } from 'src/users/application/dto/create-user.dto';
import { User } from '../model/user.entity';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
}
