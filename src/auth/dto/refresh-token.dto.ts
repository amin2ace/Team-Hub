import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
