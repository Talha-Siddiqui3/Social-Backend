import {Body, Controller, Get, Inject, Put, Query, UseInterceptors} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserResponseDto } from './dto/user-response.dto';
import { BaseResponseDto } from '../dto/base.response.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  getUser(@Query('id') id: string): Observable<UserResponseDto> {
    return this.client.send('getUser', id);
  }

  @Put()
  @UseInterceptors(FileInterceptor('photo'))
  updateUser(@Body() updateUserDto: UpdateUserDto): Observable<BaseResponseDto> {
    return this.client.send('getUser', id);
  }
}
