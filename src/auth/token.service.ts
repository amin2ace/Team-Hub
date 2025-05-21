import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from './interface/token-service.interface';
import { TokenType, Token } from 'src/common/enum';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async createToken(type: TokenType): Promise<Token> {
    throw new Error('Method not implemented.');
  }
  async verifyToken(token: Token): Promise<Boolean> {
    throw new Error('Method not implemented.');
  }
  async storeToken(token: Token): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async removeToken(token: Token): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async refreshToken(token: Token): Promise<Token> {
    throw new Error('Method not implemented.');
  }
}
