import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserResponseDto } from './dto/user-response.dto';
import { BaseResponseDto } from '../dto/base.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  async getUser(@Query('id') id: string): Promise<UserResponseDto> {
    const userResponseDto: UserResponseDto = await this.client
      .send<UserResponseDto>('getUser', id)
      .toPromise();
    return userResponseDto;
  }

  @Put()
  @FormDataRequest()
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<BaseResponseDto> {
    console.log('updateUserDto', updateUserDto);
    return this.client.send('updateUser', updateUserDto);
  }
}
