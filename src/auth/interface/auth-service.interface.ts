import { UserCreateDto } from 'src/users/dto';
import {
  ChangePasswordDto,
  RefreshTokenDto,
  TokenResponseDto,
  userLoginDto,
} from '../dto';
import { IToken } from 'src/common/enum';
import { User } from 'src/users/schema/user.entity';
import { ForgetPasswordDto } from '../dto/forget-password.dto';

export interface IAuthService {
  register(registerData: UserCreateDto): Promise<User>;

  login(loginData: userLoginDto): Promise<User>;

  refreshToken(refreshTokenData: RefreshTokenDto): Promise<TokenResponseDto>;

  forgetPassword(forgetPasswordData: ForgetPasswordDto): Promise<string>;

  changePassword(changePasswordData: ChangePasswordDto): Promise<string>;

  logout(userId: string): Promise<string>;

  hash(data: string): Promise<string>;

  compareHash(plainData: string, encryptedData: string): Promise<boolean>;

  generateTokens(userId: string): Promise<IToken[]>;
}
