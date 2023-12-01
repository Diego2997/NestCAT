import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/application/dto/create-user.dto';
import { User } from 'src/users/domain/model/user.entity';
import { IUserRepository } from 'src/users/domain/repository/user.repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}
