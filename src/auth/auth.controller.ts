import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/users/dto/create-user-request.dto';
import {
  ForgetPasswordDto,
  ResetPasswordDto,
  UserCreateResponseDto,
  userLoginDto,
} from './dto';
import { UsersService } from 'src/users/users.service';
import { ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { TokenType } from 'src/common/enum';
import { Serialize } from 'src/common/decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Serialize(UserCreateResponseDto)
  @ApiCookieAuth(TokenType.REFRESH)
  @Post('/register')
  async register(@Body() registerData: UserCreateDto) {
    return this.authService.register(registerData);
  }

  @ApiCookieAuth(TokenType.REFRESH)
  @Post('/login')
  async login(@Body() loginData: userLoginDto) {
    return this.authService.login(loginData);
  }

  @Post('/refresh')
  async refresh() {}

  @ApiBearerAuth(TokenType.ACCESS)
  @Post('/forget-password')
  async forget(@Body() forgetPasswordData: ForgetPasswordDto) {}

  @ApiBearerAuth(TokenType.ACCESS)
  @Post('/reset-password')
  async reset(@Body() resetPasswordData: ResetPasswordDto) {}

  @ApiBearerAuth(TokenType.ACCESS)
  @Post('/logout')
  async logout(@Req() req) {}
}
