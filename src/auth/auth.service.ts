import { Injectable } from '@nestjs/common';
import { IAuthService } from './interface/auth-service.interface';
import { UserCreateDto, UserUpdateDto } from 'src/users/dto';
import {
  userLoginDto,
  RefreshTokenDto,
  TokenResponseDto,
  ChangePasswordDto,
} from './dto';
import { UsersService } from 'src/users/users.service';
import {
  EmailAlreadyInUseException,
  HashComparisonException,
  HashGenerationException,
  InvalidCredentialConfirmationException,
  InvalidCredentialsException,
  RefreshTokenInvalidException,
} from 'src/common/exception';
import { PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { IToken, TokenType } from 'src/common/enum';
import { User } from 'src/users/schema/user.entity';
import { string } from 'joi';

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
  async refreshToken(
    refreshTokenData: RefreshTokenDto,
  ): Promise<TokenResponseDto> {
    const { refreshToken } = refreshTokenData;

    const token = {
      type: TokenType.REFRESH,
      value: refreshToken,
    };

    const isTokenValid = await this.tokenService.verifyToken({
      type: TokenType.REFRESH,
      value: refreshToken,
    });

    if (!isTokenValid) {
      throw new RefreshTokenInvalidException();
    }

    const storedToken = await this.tokenService.refreshToken(token);
    return {
      tokens: await this.generateTokens(storedToken.userId),
    };
  }

  async forgetPassword(forgetPasswordData: ChangePasswordDto): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async changePassword(changePasswordData: ChangePasswordDto): Promise<string> {
    const { email, oldPassword, newPassword, confirmPassword } =
      changePasswordData;
    const user = await this.usersService.findByEmail(email);

    const hashedPassword = await this.hash(oldPassword);
    if (hashedPassword !== user.password) {
      throw new InvalidCredentialsException();
    }

    if (newPassword !== confirmPassword) {
      throw new InvalidCredentialConfirmationException();
    }

    const newHashedPassword = await this.hash(newPassword);
    await this.usersService.update(user.userId, {
      password: newHashedPassword,
    } as UserUpdateDto);

    return 'Password Change Successfully';
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
    const accessToken = await this.tokenService.createToken(
      TokenType.ACCESS,
      {
        sub: TokenType.ACCESS,
        userId: userId,
      },
      this.config.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
    );
    const refreshToken = await this.tokenService.createToken(
      TokenType.REFRESH,
      {
        sub: TokenType.REFRESH,
        userId: userId,
      },
      this.config.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
    );

    await this.tokenService.storeToken(refreshToken, userId);
    await this.tokenService.setTokenInCache(refreshToken);

    return [accessToken, refreshToken];
  }
}
