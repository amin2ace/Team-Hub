import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserCreateDto } from 'src/users/dto/create-user-request.dto';

export class userLoginDto implements Partial<UserCreateDto> {
  @ApiProperty({
    example: 'john.wick@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John!#Wick2014',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
