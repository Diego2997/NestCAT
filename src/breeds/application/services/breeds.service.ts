import { CreateBreedDto } from '../dto/create-breed.dto';
import { UpdateBreedDto } from '../dto/update-breed.dto';
import { BreedRepository } from 'src/breeds/infrastructure/database/breed.repository';

export class BreedsService {
  constructor(private readonly breedRepository: BreedRepository) {}

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.create(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.findAll();
  }

  async findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return `This action updates a #${id} breed`;
  }

  async remove(id: number) {
    return `This action removes a #${id} breed`;
  }
}
