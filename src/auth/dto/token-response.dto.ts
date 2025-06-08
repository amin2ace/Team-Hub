import { Expose } from 'class-transformer';
import { IToken } from 'src/common/enum';

export class TokenResponseDto {
  @Expose()
  tokens: IToken[];
}
