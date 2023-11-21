import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';

@Module({
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Breed])],
})
export class BreedsModule {}
