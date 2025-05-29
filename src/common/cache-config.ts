import { createKeyv } from '@keyv/redis';
import { CacheOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheableMemory } from 'cacheable';
import Keyv from 'keyv';

@Injectable()
export class CacheConfig implements CacheOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createCacheOptions():
    | CacheOptions<Record<string, any>>
    | Promise<CacheOptions<Record<string, any>>> {
    return {
      stores: [
        new Keyv({
          store: new CacheableMemory({
            ttl: this.config.get<number>('REDIS_CACHE_TTL_MINUTES') * 1000,
            lruSize: this.config.get<number>('LRU_SIZE'),
            //LAST_RECENTLY_USED_SIZE for clear older ones if occupied
          }),
        }),
        createKeyv(this.config.get<string>('REDIS_URL')),
      ],
    };
  }
}
