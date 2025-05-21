export enum TokenType {
  ACCESS = 'ACCESS_TOKEN',
  REFRESH = 'REFRESH_TOKEN',
}

export interface Token {
  type: TokenType;
  value: string;
}
