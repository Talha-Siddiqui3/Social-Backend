import {
  Body,
  Controller,
  Get,
  Inject,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserResponseDto } from './dto/user-response.dto';
import { BaseResponseDto } from '../dto/base.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  async getUser(@Query('id') id: string): Promise<UserResponseDto> {
    const userResponseDto:UserResponseDto = await this.client.send<UserResponseDto>('getUser', id).toPromise();
    return userResponseDto
  }

  @Put()
  @UseInterceptors(FileInterceptor('photo'))
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile('photo') photo: Express.Multer.File,
  ): Observable<BaseResponseDto> {
    return this.client.send('updateUser', { updateUserDto, photo });
  }
}
