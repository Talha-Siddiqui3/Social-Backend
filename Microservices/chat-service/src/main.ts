import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4000,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices()
  await app.listen(3000);
}

bootstrap();
