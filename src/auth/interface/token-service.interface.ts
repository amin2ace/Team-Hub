import { IToken, TokenType } from 'src/common/enum';

export interface ITokenService {
  createToken(type: TokenType, payload: object): Promise<IToken>;
  verifyToken(token: IToken): Promise<any>;
  storeToken(token: IToken, userId: string): Promise<void>;
  removeToken(userId: string): Promise<void>;
  refreshToken(token: IToken): Promise<IToken>;
  cacheRefreshToken(token: string): Promise<void>;
  getCache(key: TokenType): Promise<IToken>;
}
