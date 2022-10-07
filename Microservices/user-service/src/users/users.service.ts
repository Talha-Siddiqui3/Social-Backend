import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import {BaseResponseDto} from "./dto/base-response.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.phoneNumber = createUserDto.phoneNumber;
    user.accessToken = createUserDto.accessToken;
    console.log('creating user', user)
    return this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({ id: id });
    const userResponseDto = { ...user, success: user !== null };
    return userResponseDto;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({
      phoneNumber: phoneNumber,
    });
    const userResponseDto = { ...user, success: user !== null };
    return userResponseDto;
  }

  update(updateUserDto: UpdateUserDto):BaseResponseDto {
    console.log('updateUserDto', updateUserDto);
    return {success:true}
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
