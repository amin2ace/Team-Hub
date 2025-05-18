import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.get<number>('PORT'));
}
bootstrap();
