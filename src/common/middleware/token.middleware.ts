import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AuthorizationNotFoundException,
  BearerNotFoundException,
  TokenInvalidException,
  TokenNotFoundException,
} from '../exception';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/auth/token.service';
import { IToken, TokenType } from '../enum';

export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: Request, res: Response, next: (error?: any) => void) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AuthorizationNotFoundException();
    }
    const bearer = authorization.split(' ');

    if (!bearer || bearer.length !== 2 || bearer[0] !== 'Bearer') {
      throw new BearerNotFoundException();
    }

    const token: IToken = {
      type: TokenType.ACCESS,
      value: bearer[1],
    };

    if (!token) {
      throw new TokenNotFoundException();
    }

    const payload = await this.tokenService.verifyToken(token);

    if (!payload) {
      throw new TokenInvalidException();
    }

    res['userId'] = payload.userId;
    next();
  }
}
