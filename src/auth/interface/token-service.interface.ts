import { Token, TokenType } from 'src/common/enum';

export interface ITokenService {
  createToken(type: TokenType): Promise<Token>;
  verifyToken(token: Token): Promise<Boolean>;
  storeToken(token: Token): Promise<void>;
  removeToken(token: Token): Promise<void>;
  refreshToken(token: Token): Promise<Token>;
}
