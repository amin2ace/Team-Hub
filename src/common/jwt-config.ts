import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtConfig implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      global: true,
      secret: this.config.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: this.config.get<string>('JWT_EXPIRES_IN'),
      },
    };
  }
}
