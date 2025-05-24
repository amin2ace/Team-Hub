import { IToken, TokenType } from 'src/common/enum';

export interface ITokenService {
  createToken(type: TokenType, payload: object): Promise<IToken>;
  verifyToken(token: IToken): Promise<null | any>;
  storeToken(token: IToken, userId: string): Promise<void>;
  removeToken(userId: string): Promise<void>;
  refreshToken(token: IToken): Promise<IToken>;
}
