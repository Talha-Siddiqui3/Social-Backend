import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import { LoginRequestDto } from './dto/auth/login.request.dto';
import { LoginResponseDto } from './dto/auth/login.response.dto';
import { VerifyRequestDto } from './dto/auth/verify.request.dto';
import { VerifyResponseDto } from './dto/auth/verify.response.dto';
import {Observable} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Get()
  getHello() {
    return 'HelloWorld';
  }

  @Post('login')
   login(@Body() data: LoginRequestDto): Observable<LoginResponseDto> {
    return this.client.send({ cmd: 'login' }, data);
  }

  @Post('verify')
  verify(@Body() data: VerifyRequestDto):  Observable<VerifyResponseDto> {
    return this.client.send({ cmd: 'verify' }, data);
  }
}
