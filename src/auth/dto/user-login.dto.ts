import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserCreateDto } from 'src/users/dto/create-user-request.dto';

export class userLoginDto implements Partial<UserCreateDto> {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
