import { Injectable } from '@nestjs/common';
import { IAuthService } from './interface/auth-service.interface';
import { UserCreateDto } from 'src/users/dto';
import {
  userLoginDto,
  RefreshTokenDto,
  TokenResponseDto,
  ForgetPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from './dto';
import { UsersService } from 'src/users/users.service';
import {
  EmailAlreadyInUseException,
  HashComparisonException,
  HashGenerationException,
  InvalidCredentialsException,
} from 'src/common/exception';
import { PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { IToken, TokenType } from 'src/common/enum';
import { User } from 'src/users/schema/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    logger.setContext(AuthService.name);
  }

  async register(registerData: UserCreateDto): Promise<User> {
    const { email, password } = registerData;
    const isEmailInUse = await this.usersService.findByEmail(email);

    if (isEmailInUse) {
      this.logger.warn('Email already in use');
      throw new EmailAlreadyInUseException();
    }

    const hashedPassword = await this.hash(password);

    const user = await this.usersService.createNewUser({
      ...registerData,
      password: hashedPassword,
    });

    await this.generateTokens(user.userId);
    return user;
  }

  async login(loginData: userLoginDto): Promise<User> {
    const { email, password } = loginData;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }
    const hashedPassword = await this.hash(password);
    const isPasswordValid = await this.compareHash(password, hashedPassword);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    await this.generateTokens(user.userId);
    return user;
  }
  refreshToken(refreshTokenData: RefreshTokenDto): Promise<TokenResponseDto> {
    throw new Error('Method not implemented.');
  }

  forgetPassword(forgetPasswordData: ForgetPasswordDto): Promise<string> {
    throw new Error('Method not implemented.');
  }
  changePassword(changePasswordData: ChangePasswordDto): Promise<string> {
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
    try {
      return bcrypt.compare(plainData, encryptedData);
    } catch (error) {
      throw new HashComparisonException();
    }
  }

  async generateTokens(userId: string): Promise<IToken[]> {
    const accessToken = await this.tokenService.createToken(TokenType.ACCESS, {
      sub: TokenType.ACCESS,
      userId: userId,
    });
    const refreshToken = await this.tokenService.createToken(
      TokenType.REFRESH,
      {
        sub: TokenType.REFRESH,
        userId: userId,
      },
    );

    await this.tokenService.storeToken(refreshToken, userId);
    await this.tokenService.setTokenInCache(refreshToken);

    return [accessToken, refreshToken];
  }
}
