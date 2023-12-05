import { Module } from '@nestjs/common';
import { BreedsService } from './application/services/breeds.service';
import { BreedsController } from './interface/breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './domain/model/breed.entity';

@Module({
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Breed])],
})
export class BreedsModule {}
