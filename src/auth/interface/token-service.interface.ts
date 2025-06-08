import { IToken, TokenType } from 'src/common/enum';
import { Token } from '../schema/token.entity';

export interface ITokenService {
  createToken(
    type: TokenType,
    payload: object,
    expiresIn: string,
  ): Promise<IToken>;
  verifyToken(token: IToken): Promise<any>;
  storeToken(token: IToken, userId: string): Promise<void>;
  removeToken(userId: string): Promise<void>;
  refreshToken(token: IToken): Promise<Token>;
  setTokenInCache(token: IToken): Promise<void>;
  getTokenFromCache(key: TokenType): Promise<IToken>;
}
