import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from '../dto/login.request.dto';
import { OtpService } from './otp/otp.service';
import { LoginResponseDto } from '../dto/login.response.dto';

@Injectable()
export class AppService {
  constructor(private readonly otpService: OtpService) {}

  login(request: LoginRequestDto): Promise<LoginResponseDto> {
    return this.otpService.sendOTP(request.phoneNumber);
  }
}
