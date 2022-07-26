import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      logger: ['error', 'warn', 'debug']
    }
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true
  })
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
