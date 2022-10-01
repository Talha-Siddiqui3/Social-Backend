import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../config/app.config';

@Injectable()
export class SmsService {
  constructor(
    private readonly twilioService: TwilioService,
    private configService: ConfigService,
  ) {}

  async sendSMS(phoneNumber: string, passCode: string): Promise<boolean> {
    const message = 'Welcome, your OTP for Social App is: ' + passCode;

    const response = await this.twilioService.client.messages.create({
      body: message,
      from: this.configService.get(ConfigKeys.TWILIO_PHONE_NUMBER),
      to: phoneNumber,
    });

    console.log('Twilio Response', response);
    return response.errorCode === null;
  }
}
