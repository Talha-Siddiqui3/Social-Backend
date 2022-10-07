import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  createUser(
    phoneNumber: string,
    accessToken: string,
  ): Promise<UserResponseDto> {
    return this.client
      .send('createUser', { phoneNumber, accessToken })
      .toPromise();
  }

  getUserByPhoneNumber(phoneNumber: string): Promise<UserResponseDto> {
    return this.client.send('getUserByPhoneNumber', phoneNumber).toPromise();
  }
}
