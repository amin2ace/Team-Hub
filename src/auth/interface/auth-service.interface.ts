import { UserCreateResponseDto, UserCreateDto } from 'src/users/dto';
import {
  ForgetPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  TokenResponseDto,
  userLoginDto,
  userLoginResponseDto,
} from '../dto';
import { IToken } from 'src/common/enum';

export interface IAuthService {
  register(registerData: UserCreateDto): Promise<IToken[]>;

  login(loginData: userLoginDto): Promise<IToken[]>;

  refreshToken(refreshTokenData: RefreshTokenDto): Promise<TokenResponseDto>;

  forgetPassword(forgetPasswordData: ForgetPasswordDto): Promise<string>;

  resetPassword(resetPasswordData: ResetPasswordDto): Promise<string>;

  logout(userId: string): Promise<string>;

  hash(data: string): Promise<string>;

  compareHash(plainData: string, encryptedData: string): Promise<boolean>;

  generateTokens(userId: string): Promise<IToken[]>;
}
