import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { VerifyRequestDto } from './dto/verify-request.dto';
import { VerifyResponseDto } from './dto/verify-response.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'helloworld' })
  getHello() {
    return 'HelloWorld';
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Body() data: LoginRequestDto): Promise<LoginResponseDto> {
    await this.appService.login(data);
    return { success: true, error: null };
  }

  @MessagePattern({ cmd: 'verify' })
  verify(@Body() data: VerifyRequestDto): Promise<VerifyResponseDto> {
    return this.appService.verify(data);
  }
}
