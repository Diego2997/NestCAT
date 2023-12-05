import { Module } from '@nestjs/common';
import { CatsService } from './application/services/cats.service';
import { CatsController } from './interface/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './domain/model/cat.entity';
import { Breed } from 'src/breeds/domain/model/breed.entity';
import { CatRepository } from './infrastructure/database/cat.repository';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatRepository],
  imports: [TypeOrmModule.forFeature([Cat, Breed])],
})
export class CatsModule {}
