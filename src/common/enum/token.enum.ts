export enum TokenType {
  ACCESS = 'ACCESS_TOKEN',
  REFRESH = 'REFRESH_TOKEN',
}

export interface IToken {
  type: TokenType;
  value: string;
}
