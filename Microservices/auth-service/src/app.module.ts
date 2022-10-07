import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpService } from './otp/otp.service';
import { TwilioModule } from 'nestjs-twilio';
import { SmsService } from './sms/sms.service';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { User } from './entity/user.entity';
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
      host: 'redis-0.redis.default.svc.cluster.local',
      //host: 'localhost', //default host
      port: 6379,
      //port: 55000,
      auth_pass: process.env.REDIS_AUTH_PASS,
      //auth_pass: 'redispw',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-service-internal.default.svc.cluster.local',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: 'main',
      entities: [User],
      synchronize: false,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, OtpService, SmsService],
})
export class AppModule {}
