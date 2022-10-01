import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from '../dto/login.response.dto';
import { LoginRequestDto } from '../dto/login.request.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() data: LoginRequestDto): Promise<LoginResponseDto> {
    await this.appService.login(data);
    return { statusCode: 200, success: true, error: null };
  }
}
