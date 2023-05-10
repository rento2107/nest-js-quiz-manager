// db.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './postgres/user/repository/user.repository';
import { UsersDbService } from './postgres/user/user.database.service';

const reposities = [UserRepository]
const services = [UsersDbService]
@Global()
@Module({
  imports: [TypeOrmModule.forFeature(reposities)],
  providers:  [...services],
  exports: [...services],
})
export class DatabaseModule {}
