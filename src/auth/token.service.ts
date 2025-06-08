import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from './interface/token-service.interface';
import { TokenType, IToken } from 'src/common/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './schema/token.entity';
import { Repository } from 'typeorm';
import {
  RefreshTokenInvalidException,
  TokenVerificationException,
} from 'src/common/exception';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
  ) {}
  async createToken(
    type: TokenType,
    payload: object,
    expiresIn: string,
  ): Promise<IToken> {
    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return {
      type,
      value: token,
    };
  }
  async verifyToken(token: IToken): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token.value);
    } catch (error) {
      throw new TokenVerificationException(error);
    }
  }
  async storeToken(token: IToken, userId: string): Promise<void> {
    await this.removeToken(userId);

    const record = this.tokenRepo.create({
      userId,
      token: token.value,
    });

    await this.tokenRepo.save(record);
  }

  async removeToken(userId: string): Promise<void> {
    const token = await this.tokenRepo.findOne({
      where: {
        userId,
      },
    });

    if (!token) {
      return;
    }

    await this.tokenRepo.remove(token);
  }
  async refreshToken(token: IToken): Promise<Token> {
    const { value } = token;
    const storedToken = await this.tokenRepo.findOne({
      where: {
        token: value,
      },
    });

    if (!storedToken) {
      throw new RefreshTokenInvalidException();
    }

    const { userId } = storedToken;
    await this.removeToken(userId);

    return storedToken;
  }

  async setTokenInCache(token: IToken): Promise<void> {
    await this.cache.set(token.type, token.value);
  }

  async getTokenFromCache(key: TokenType): Promise<IToken> {
    const cachedValue = (await this.cache.get(key)) as string;

    return {
      type: key,
      value: cachedValue,
    } as IToken;
  }
}
