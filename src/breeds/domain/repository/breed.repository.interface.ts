import { CreateBreedDto } from 'src/breeds/application/dto/create-breed.dto';
import { Breed } from '../model/breed.entity';
import { UpdateBreedDto } from 'src/breeds/application/dto/update-breed.dto';
import { UpdateResult } from 'typeorm';

export interface IBreedRepository {
  create(createBreedDto: CreateBreedDto): Promise<Breed>;
  findAll(): Promise<Breed[]>;
  findOne(id: number): Promise<Breed>;
  update(id: number, updateBreedDto: UpdateBreedDto): Promise<UpdateResult>;
  remove(id: number): Promise<UpdateResult>;
}
