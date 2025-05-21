import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/users/dto/create-user-request.dto';
import { ForgetPasswordDto, ResetPasswordDto, userLoginDto } from './dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() registerData: UserCreateDto) {}

  @Post('/login')
  async login(@Body() loginData: userLoginDto) {}

  @Post('/refresh')
  async refresh() {}

  @Post('/forget')
  async forget(@Body() forgetPasswordData: ForgetPasswordDto) {}

  @Post('/reset')
  async reset(@Body() resetPasswordData: ResetPasswordDto) {}

  @Post('/logout')
  async logout(@Req() req) {}
}
