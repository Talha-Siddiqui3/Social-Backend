import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { CustomStrategy } from './custom-strategy.service';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule.register({ defaultStrategy: 'custom' })],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.AUTH_SERVICE_HOST,
            port: 4000,
          },
        }),
    },
    CustomStrategy,
  ],
})
export class AuthModule {}
