import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './schema/token.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Token])],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
