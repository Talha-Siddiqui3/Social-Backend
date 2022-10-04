import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

export enum Microservices {
  AUTH_MICROSERVICE = 'AUTH_MICROSERVICE',
}

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) =>
          ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
              host: 'auth-service-internal.default.svc.cluster.local',
              //host: 'localhost',
              port: 4000,
            },
          }),
    },
  ],
})
export class AppModule {}
