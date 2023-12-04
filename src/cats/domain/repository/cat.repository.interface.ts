import { UserActiveInterface } from 'src/auth/interfaces/user-active.interface';
import { CreateCatDto } from 'src/cats/application/dto/create-cat.dto';
import { Cat } from '../model/cat.entity';
import { UpdateCatDto } from 'src/cats/application/dto/update-cat.dto';
import { UpdateResult } from 'typeorm';

export interface ICatRepository {
  create(createCatDto: CreateCatDto, user: UserActiveInterface): Promise<Cat>;
  findAll(user: UserActiveInterface): Promise<Cat[]>;
  findOne(id: number, user: UserActiveInterface): Promise<Cat>;
  update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActiveInterface,
  ): Promise<UpdateResult>;
  remove(id: number, user: UserActiveInterface): Promise<UpdateResult>;
}
