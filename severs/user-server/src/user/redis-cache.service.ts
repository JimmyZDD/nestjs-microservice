/*
 * @Author: zdd
 * @Date: 2024-04-22 21:14:08
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2024-04-22 21:14:17
 * @FilePath: redis-cache.service.ts
 */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  cacheSet(key: string, value: string, ttl: number) {
    this.cacheManager.set(key, value, ttl);
  }

  async cacheGet(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }
}
