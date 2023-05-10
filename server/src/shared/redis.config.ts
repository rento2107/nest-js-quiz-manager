import { Injectable, CacheOptionsFactory, CacheModuleOptions, CacheStore } from "@nestjs/common";


// custom-redis-store.ts
import { RedisStore, redisStore } from 'cache-manager-redis-store';

export interface CustomRedisStore extends CacheStorage, RedisStore{
  async get<T>(key: string, options: any, cb: any): Promise<T> {
    return this.get(key, options, (err, value) => {
      if (err) {
        return cb(err);
      }
      cb(null, value);
    });
  }
}

@Injectable()
export class RedisConfig implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: 5,
      store: new CustomRedisStore(),
    };
  }
}