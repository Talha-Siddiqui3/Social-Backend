import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { OtpService } from './otp/otp.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { VerifyRequestDto } from './dto/verify.request.dto';
import { VerifyResponseDto } from './dto/verify.response.dto';
import { BaseResponseDto } from './dto/base.response.dto';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const success = await this.otpService.sendOtp(request.phoneNumber);
    const baseResponse = this.verifySuccessBool(success);
    return baseResponse;
  }

  async verify(request: VerifyRequestDto): Promise<VerifyResponseDto> {
    const success = await this.otpService.verifyOtp(
      request.phoneNumber,
      request.otpCode,
    );
    console.log('success', success);
    let accessToken = null;
    if (success) {
      const user = await this.userService.findUser(request.phoneNumber);

      if (user) {
        accessToken = user?.id ? user?.access_token : null;
      } else {
        const user = await this.userService.createUser(request.phoneNumber);
        accessToken = this.authService.signUser(user.id, user.phone_number);
        user.access_token = accessToken;
        await this.userService.updateUser(user);
      }
    }
    const error = success === false ? 'Invalid Otp' : null;
    return {
      accessToken: accessToken,
      success: success,
      error: error,
      statusCode: 200,
    };
  }

  private verifySuccessBool(success: boolean): BaseResponseDto {
    let statusCode = 200;
    let message: string = null;
    if (success === false) {
      statusCode = 500;
      message = 'Internal Server Error';
    }
    return {
      statusCode: statusCode,
      success: success,
      message: message,
    };
  }
}
