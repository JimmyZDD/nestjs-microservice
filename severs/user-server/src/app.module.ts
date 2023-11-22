/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 11:32:44
 * @FilePath: app.module.ts
 */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CaptchaModule } from './captcha/captcha.module';

@Module({
  imports: [UserModule, CaptchaModule]
})
export class AppModule {}
