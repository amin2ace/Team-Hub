import {
  CreateUserResponseDto,
  UserCreateDto,
  userLoginResponseDto,
} from 'src/users/dto';
import {
  ForgetPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  TokenResponseDto,
  userLoginDto,
} from '../dto';

export interface AuthService {
  register(registerData: UserCreateDto): Promise<CreateUserResponseDto>;

  login(loginData: userLoginDto): Promise<userLoginResponseDto>;

  refreshToken(refreshTokenData: RefreshTokenDto): Promise<TokenResponseDto>;

  forgetPassword(forgetPasswordData: ForgetPasswordDto): Promise<string>;

  resetPassword(resetPasswordData: ResetPasswordDto): Promise<string>;

  logout(userId: string): Promise<string>;
}
