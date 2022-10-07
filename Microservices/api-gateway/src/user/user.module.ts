import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'user-service-internal.default.svc.cluster.local',
            port: 3000,
          },
        }),
    },
  ],
})
export class UserModule {}
