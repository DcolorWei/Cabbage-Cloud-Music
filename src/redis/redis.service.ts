
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
 
@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {
  }
 
  cacheSet(key: string, value: string, ttl: number) {
    this.cacheManager.set(key, value, { ttl: ttl }, (err: any) => {
      if (err) {
        throw err;
      }
    })
  }
 
  async cacheGet(key: any): Promise<any> {
    return this.cacheManager.get(key);
  }

  cacheDel(key: any): Promise<any> {
    return this.cacheManager.del(key);
  }
  
}