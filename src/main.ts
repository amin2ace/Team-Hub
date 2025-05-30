import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TokenType } from './common/enum';

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
  swagger(app);
  await app.listen(config.get<number>('PORT'));
}

function swagger(app: INestApplication) {
  const document = new DocumentBuilder()
    .setTitle('Team Hub')
    .addBearerAuth({ type: 'http' }, TokenType.ACCESS)
    .addCookieAuth(TokenType.REFRESH)
    .build();

  const swaggerDocument = () => SwaggerModule.createDocument(app, document);

  SwaggerModule.setup(config.get<string>('SWAGGER_PATH'), app, swaggerDocument);
}
bootstrap();
