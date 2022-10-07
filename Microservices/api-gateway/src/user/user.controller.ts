import {Controller, Get, Inject, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  getUser(@Query('id') id: string): Observable<UserResponseDto> {
    return this.client.send('getUser', id);
  }
}
