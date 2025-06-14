import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import {
  CacheConfig,
  JwtConfig,
  TypeormConfig,
  validationSchema,
} from './common/config';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.development.env',
      validationSchema: validationSchema,
    }),
    LoggerModule.forRootAsync({
      useFactory(...args) {
        return {
          pinoHttp: {
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            transport:
              process.env.NODE_ENV !== 'production'
                ? { target: 'pino-pretty' }
                : undefined,
          },
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfig,
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useClass: CacheConfig,
    }),

    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
