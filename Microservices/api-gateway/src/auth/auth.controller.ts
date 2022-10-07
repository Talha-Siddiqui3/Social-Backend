import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {LoginResponseDto} from "./dto/login.response.dto";
import {LoginRequestDto} from "./dto/login.request.dto";
import {VerifyRequestDto} from "./dto/verify.request.dto";
import {VerifyResponseDto} from "./dto/verify.response.dto";

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('login')
  login(@Body() data: LoginRequestDto): Observable<LoginResponseDto> {
    return this.client.send({ cmd: 'login' }, data);
  }

  @Post('verify')
  verify(@Body() data: VerifyRequestDto): Observable<VerifyResponseDto> {
    return this.client.send({ cmd: 'verify' }, data);
  }
}
