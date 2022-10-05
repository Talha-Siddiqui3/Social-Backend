//importing Get, Inject, Inject, and CACHE_MANAGER from nestjs/common
import { Injectable } from '@nestjs/common';
import { SmsService } from '../sms/sms.service';
import { VerifyResponseDto } from '../dto/verify.response.dto';

const crypto_secure_random_digit = require('crypto-secure-random-digit');

//importing Get, Inject, Inject, and CACHE_MANAGER from nestjs/common
import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class OtpService {
  private readonly otpExpiry = 500;

  constructor(
    private readonly smsService: SmsService,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
  ) {}

  private static generateCode(): string {
    const otpCode = crypto_secure_random_digit.randomDigits(4).join('');
    return otpCode;
  }

  async sendOtp(phoneNumber: string): Promise<boolean> {
    const otpCode = OtpService.generateCode();
    const success = await this.smsService.sendSMS(phoneNumber, otpCode);
    //const success = true;
    if (success === true) {
      const storeOtpResponse = await this.storeOtp(phoneNumber, otpCode);
      console.log(storeOtpResponse);
      console.log(`SENT OTP to: ${phoneNumber}`);
    }
    return success;
  }

  async verifyOtp(phoneNumber: string, otpCode: string): Promise<boolean> {
    const storedOtp = await this.getOtp(phoneNumber);
    // console.log('phone number', phoneNumber);
    // console.log('Stored Otp', storedOtp);
    // console.log('Sent Otp', otpCode);
    return storedOtp === otpCode;
  }

  private storeOtp(phoneNumber, otpCode) {
    return this.cacheManager.set(phoneNumber, otpCode, { ttl: this.otpExpiry });
  }

  private getOtp(phoneNumber: string): Promise<string | null> {
    return this.cacheManager.get(phoneNumber);
  }
}
