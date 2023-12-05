import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBreedDto } from 'src/breeds/application/dto/create-breed.dto';
import { UpdateBreedDto } from 'src/breeds/application/dto/update-breed.dto';
import { Breed } from 'src/breeds/domain/model/breed.entity';
import { IBreedRepository } from 'src/breeds/domain/repository/breed.repository.interface';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BreedRepository implements IBreedRepository {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}
  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    return await this.breedRepository.save(createBreedDto);
  }
  async findAll(): Promise<Breed[]> {
    return await this.breedRepository.find({});
  }
  async findOne(id: number): Promise<Breed> {
    throw new Error('Method not implemented.');
  }
  update(id: number, updateBreedDto: UpdateBreedDto): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
  remove(id: number): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
}
