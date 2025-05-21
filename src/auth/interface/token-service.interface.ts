import { IToken, TokenType } from 'src/common/enum';

export interface ITokenService {
  createToken(type: TokenType, payload: object): Promise<IToken>;
  verifyToken(token: IToken): Promise<Boolean>;
  storeToken(token: IToken, userId: string): Promise<void>;
  removeToken(token: IToken): Promise<void>;
  refreshToken(token: IToken): Promise<IToken>;
}
