/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 11:31:33
 * @FilePath: user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
