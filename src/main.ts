import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200', // angular
      'http://localhost:3000', // react
      'http://localhost:8081', // react-native
    ],
  });
  await app.listen(port);
  Logger.log(`Server running at localhost:${port}`, 'BOOTSTRAP');
}
bootstrap();
