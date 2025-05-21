import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception';
import { Logger } from 'nestjs-pino';

const config = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new HttpExceptionFilter(app.get(Logger)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(config.get<number>('PORT'));
}
bootstrap();
