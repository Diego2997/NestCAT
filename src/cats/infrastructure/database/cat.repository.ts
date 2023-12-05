import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActiveInterface } from 'src/auth/interfaces/user-active.interface';
import { CreateCatDto } from 'src/cats/application/dto/create-cat.dto';
import { UpdateCatDto } from 'src/cats/application/dto/update-cat.dto';
import { Cat } from 'src/cats/domain/model/cat.entity';
import { ICatRepository } from 'src/cats/domain/repository/cat.repository.interface';
import { Repository, UpdateResult } from 'typeorm';
import { Breed } from 'src/breeds/domain/model/breed.entity';
import { Role } from 'src/auth/enums/rol.enum';

@Injectable()
export class CatRepository implements ICatRepository {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(
    createCatDto: CreateCatDto,
    user: UserActiveInterface,
  ): Promise<Cat> {
    const breed = await this.validateBreed(createCatDto.breed);
    return await this.catRepository.save({
      ...createCatDto,
      breed,
      userEmail: user.email,
    });
  }

  async findAll(user: UserActiveInterface): Promise<Cat[]> {
    if (user.role === Role.ADMIN) {
      return await this.catRepository.find({});
    }
    return await this.catRepository.find({ where: { userEmail: user.email } });
  }

  async findOne(id: number, user: UserActiveInterface): Promise<Cat> {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException('Cat not found');
    }

    this.validateOwnership(cat, user);
    return cat;
  }

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActiveInterface,
  ): Promise<UpdateResult> {
    await this.findOne(id, user);

    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed
        ? await this.validateBreed(updateCatDto.breed)
        : undefined,
      userEmail: user.email,
    });
  }

  async remove(id: number, user: UserActiveInterface): Promise<UpdateResult> {
    await this.findOne(id, user);
    return await this.catRepository.softDelete({ id });
  }

  private validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  private async validateBreed(breed: string): Promise<Breed> {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });

    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
    return breedEntity;
  }
}
