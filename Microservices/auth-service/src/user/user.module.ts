import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import {User} from "../entity/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
})
export class UsersModule {}