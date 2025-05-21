import { Injectable } from '@nestjs/common';
import { IAuthService } from './interface/auth-service.interface';
import {
  UserCreateDto,
  UserCreateResponseDto,
  userLoginResponseDto,
} from 'src/users/dto';
import {
  userLoginDto,
  RefreshTokenDto,
  TokenResponseDto,
  ForgetPasswordDto,
  ResetPasswordDto,
} from './dto';
import { UsersService } from 'src/users/users.service';
import {
  EmailAlreadyInUseException,
  HashGenerationException,
} from 'src/common/exception';
import { PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {
    logger.setContext(AuthService.name);
  }

  async register(registerData: UserCreateDto): Promise<UserCreateResponseDto> {
    const { email, password } = registerData;
    const isEmailInUse = await this.usersService.findByEmail(email);

    if (isEmailInUse) {
      this.logger.warn('Email already in use');
      throw new EmailAlreadyInUseException();
    }

    const hashedPassword = await this.hash(password);

    return this.usersService.createNewUser({
      ...registerData,
      password: hashedPassword,
    });
  }
  login(loginData: userLoginDto): Promise<userLoginResponseDto> {
    throw new Error('Method not implemented.');
  }
  refreshToken(refreshTokenData: RefreshTokenDto): Promise<TokenResponseDto> {
    throw new Error('Method not implemented.');
  }

  forgetPassword(forgetPasswordData: ForgetPasswordDto): Promise<string> {
    throw new Error('Method not implemented.');
  }
  resetPassword(resetPasswordData: ResetPasswordDto): Promise<string> {
    throw new Error('Method not implemented.');
  }
  logout(userId: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async hash(data: string): Promise<string> {
    try {
      const ROUNDS = parseInt(this.config.get<string>('SALT_ROUNDS'));
      const salt = await bcrypt.genSalt(ROUNDS);

      const hashedData = await bcrypt.hash(data, salt);
      return hashedData;
    } catch (error) {
      throw new HashGenerationException();
    }
  }

  async compareHash(
    plainData: string,
    encryptedData: string,
  ): Promise<boolean> {
    return false;
  }
}
