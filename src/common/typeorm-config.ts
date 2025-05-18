import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      url: this.config.get<string>('MONGODB_URI'),
      database: this.config.get<string>('DB_NAME'),
      entities: [User],
    };
  }
}
