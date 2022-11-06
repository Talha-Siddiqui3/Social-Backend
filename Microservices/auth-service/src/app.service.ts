import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { OtpService } from './otp/otp.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { VerifyRequestDto } from './dto/verify-request.dto';
import { VerifyResponseDto } from './dto/verify-response.dto';
import { BaseResponseDto } from './dto/base-response.dto';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { UserResponseDto } from './user/dto/user-response.dto';

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
    let user: UserResponseDto;
    if (success) {
      user = await this.userService.getUserByPhoneNumber(request.phoneNumber);

      if (user.success === true) {
        accessToken = user?.id ? user?.accessToken : null;
      } else {
        accessToken = this.authService.signUser(request.phoneNumber);
        console.log('creating user: ', request.phoneNumber);
        user = await this.userService.createUser(
          request.phoneNumber,
          accessToken,
        );
      }
    }
    const error = success === false ? 'Invalid Otp' : null;
    return {
      userData: user,
      accessToken: accessToken,
      success: success,
      error: error,
    };
  }

  private verifySuccessBool(success: boolean): BaseResponseDto {
    let message: string = null;
    if (success === false) {
      message = 'Internal Server Error';
    }
    return {
      success: success,
      message: message,
    };
  }

  authenticate(accessToken: string): boolean {
    return this.authService.verifyRequest(accessToken);
  }
}
