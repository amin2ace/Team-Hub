import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from './interface/token-service.interface';
import { TokenType, IToken } from 'src/common/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './schema/token.entity';
import { Repository } from 'typeorm';
import { TokenVerificationException } from 'src/common/exception';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
  ) {}
  async createToken(type: TokenType, payload: object): Promise<IToken> {
    const token = await this.jwtService.signAsync(payload);
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

    const record = await this.tokenRepo.create({
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
  async refreshToken(token: IToken): Promise<IToken> {
    throw new Error('Method not implemented.');
  }
}
