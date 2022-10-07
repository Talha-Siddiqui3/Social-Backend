import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { BaseResponseDto } from './dto/base-response.dto';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private storageService: StorageService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.phoneNumber = createUserDto.phoneNumber;
    user.accessToken = createUserDto.accessToken;
    console.log('creating user', user);
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

  async update(updateUserDto: UpdateUserDto): Promise<BaseResponseDto> {
    console.log('updateUserDto', updateUserDto);
    const profilePictureLink = await this.storageService.uploadFile(
      'profile-pictures/' + uuidv4(),
      updateUserDto.profilePictureFile.mimetype,
      updateUserDto.profilePictureFile.buffer,
    );
    const updateUserObj = {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      profilePicture: profilePictureLink,
    };
    await this.usersRepository.update({ id: updateUserDto.id }, updateUserObj);
    return { success: true };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
