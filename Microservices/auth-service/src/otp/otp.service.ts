import { Injectable } from '@nestjs/common';
import { SmsService } from '../sms/sms.service';
import { LoginResponseDto } from '../../dto/login.response.dto';

const crypto_secure_random_digit = require('crypto-secure-random-digit');

@Injectable()
export class OtpService {
  constructor(private readonly smsService: SmsService) {}

  private static generateCode(): string {
    const otpCode = crypto_secure_random_digit.randomDigits(6).join('');
    return otpCode;
  }

  async sendOTP(phoneNumber: string): Promise<LoginResponseDto> {
    const otpCode = OtpService.generateCode();
    const success = await this.smsService.sendSMS(phoneNumber, otpCode);
    let statusCode = 500;
    let message: string = null;
    if (success === true) {
      console.log(`SENT OTP to: ${phoneNumber}`);
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
