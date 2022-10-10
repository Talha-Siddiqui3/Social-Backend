import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserController } from '../user/user.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ChatController } from './chat.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ChatController],
  providers: [
    {
      provide: 'CHAT_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.CHAT_SERVICE_HOST,
            port: 4000,
          },
        }),
    },
  ],
})
export class ChatModule {}
