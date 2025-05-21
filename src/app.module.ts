import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { JwtConfig, TypeormConfig, validationSchema } from './common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfig,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeormConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.development.env',
      validationSchema: validationSchema,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
