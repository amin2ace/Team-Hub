import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/users/dto/create-user-request.dto';
import { ForgetPasswordDto, ResetPasswordDto, userLoginDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() registerData: UserCreateDto) {
    return this.authService.register(registerData);
  }

  @Post('/login')
  async login(@Body() loginData: userLoginDto) {
    return this.authService.login(loginData);
  }

  @Post('/refresh')
  async refresh() {}

  @ApiBearerAuth('Access-Token')
  @Post('/forget-password')
  async forget(@Body() forgetPasswordData: ForgetPasswordDto) {}

  @ApiBearerAuth('Access-Token')
  @Post('/reset-password')
  async reset(@Body() resetPasswordData: ResetPasswordDto) {}

  @ApiBearerAuth('Access-Token')
  @Post('/logout')
  async logout(@Req() req) {}
}
