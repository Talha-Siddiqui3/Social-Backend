import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpService } from './otp/otp.service';
import { TwilioModule } from 'nestjs-twilio';
import { SmsService } from './sms/sms.service';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app.config';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: 6379,
      auth_pass: process.env.REDIS_AUTH_PASS,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, OtpService, SmsService],
})
export class AppModule {}
