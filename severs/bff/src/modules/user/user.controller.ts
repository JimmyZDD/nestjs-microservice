/*
 * @Author: zdd
 * @Date: 2023-11-22 15:13:28
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 16:50:46
 * @FilePath: user.controller.ts
 */
import { Controller, Get, Res, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('captcha')
  async getCaptcha(@Res() res, @Session() session) {
    const obj = await this.userService.getCaptcha();
    session.captcha = obj.text;

    res.type('svg');
    res.send(obj.data);
  }
}
