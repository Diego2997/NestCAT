import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/model/user.entity';
import { UserRepository } from 'src/users/infrastructure/database/user.repository';

@Injectable()
export class UsersService {
  private logger = new Logger('UserService');
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  // async findAll() {
  //   return await this.userRepository.find();
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private handleDBErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
