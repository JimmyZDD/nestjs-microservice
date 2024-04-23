/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2024-04-23 09:53:15
 * @FilePath: user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { RedisCacheService } from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
        db: 0, //目标库,
        password: config.get('REDIS_PASSPORT'),
        no_ready_check: true
      }),
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [UserService, MailSenderService, RedisCacheService],
  controllers: [UserController]
})
export class UserModule {}
