import { Injectable } from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { UserActiveInterface } from 'src/auth/application/interfaces/user-active.interface';
import { CatRepository } from 'src/cats/infrastructure/database/cat.repository';

@Injectable()
export class CatsService {
  constructor(private readonly catRepository: CatRepository) {}

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    return await this.catRepository.create(createCatDto, user);
  }

  async findAll(user: UserActiveInterface) {
    return await this.catRepository.findAll(user);
  }

  async findOne(id: number, user: UserActiveInterface) {
    return await this.catRepository.findOne(id, user);
  }

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActiveInterface,
  ) {
    return await this.catRepository.update(id, updateCatDto, user);
  }

  async remove(id: number, user: UserActiveInterface) {
    return await this.catRepository.remove(id, user);
  }
}
