/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-24 21:57:39
 * @FilePath: user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [UserService, MailSenderService],
  controllers: [UserController]
})
export class UserModule {}
