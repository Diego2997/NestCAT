import { Module } from '@nestjs/common';
import { UsersService } from './application/services/users.service';
import { UsersController } from './interface/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/model/user.entity';
import { UserRepository } from './infrastructure/database/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
