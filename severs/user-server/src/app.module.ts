/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-24 21:58:33
 * @FilePath: app.module.ts
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CaptchaModule } from './captcha/captcha.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailSenderModule,
    UserModule,
    CaptchaModule
  ]
})
export class AppModule {}
