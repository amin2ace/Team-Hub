import { Expose } from 'class-transformer';

export class UserCreateResponseDto {
  @Expose()
  _id: string;

  @Expose()
  username: string;
}
