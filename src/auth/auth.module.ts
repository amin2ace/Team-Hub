import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './schema/token.entity';
import { TokenMiddleware } from 'src/common/middleware/token.middleware';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Token])],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes(
      {
        path: '/auth/reset-password',
        method: RequestMethod.POST,
      },
      {
        path: 'auth/forget-password',
        method: RequestMethod.POST,
      },
      {
        path: 'auth/logout',
        method: RequestMethod.POST,
      },
    );
  }
}
