import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpService } from './otp/otp.service';
import { TwilioModule } from 'nestjs-twilio';
import { SmsService } from './sms/sms.service';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OtpService, SmsService],
})
export class AppModule {}
