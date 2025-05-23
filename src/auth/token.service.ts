import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from './interface/token-service.interface';
import { TokenType, IToken } from 'src/common/enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './schema/token.entity';
import { Repository } from 'typeorm';

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
  async verifyToken(token: IToken): Promise<Boolean> {
    throw new Error('Method not implemented.');
  }
  async storeToken(token: IToken, userId: string): Promise<void> {
    const record = await this.tokenRepo.create({
      userId,
      token: token.value,
    });

    await this.tokenRepo.save(record);
  }

  async removeToken(token: IToken): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async refreshToken(token: IToken): Promise<IToken> {
    throw new Error('Method not implemented.');
  }
}
