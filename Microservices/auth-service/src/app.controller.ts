import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { VerifyRequestDto } from './dto/verify.request.dto';
import { VerifyResponseDto } from './dto/verify.response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'HelloWorld';
  }

  @Post('login')
  async login(@Body() data: LoginRequestDto): Promise<LoginResponseDto> {
    await this.appService.login(data);
    return { statusCode: 200, success: true, error: null };
  }

  @Post('verify')
  verify(@Body() data: VerifyRequestDto): Promise<VerifyResponseDto> {
    return this.appService.verify(data);
  }
}
