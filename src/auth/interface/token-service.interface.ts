import { IToken, TokenType } from 'src/common/enum';

export interface ITokenService {
  createToken(type: TokenType): Promise<IToken>;
  verifyToken(token: IToken): Promise<Boolean>;
  storeToken(token: IToken): Promise<void>;
  removeToken(token: IToken): Promise<void>;
  refreshToken(token: IToken): Promise<IToken>;
}
