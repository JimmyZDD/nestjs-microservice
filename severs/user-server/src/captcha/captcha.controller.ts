/*
 * @Author: zdd
 * @Date: 2023-11-22 14:25:31
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 15:02:40
 * @FilePath: captcha.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import {
  CaptchaServiceController,
  CaptchaServiceControllerMethods
} from 'src/gen-code/user';
import { EmptyReq } from 'src/gen-code/common';

@Controller('captcha')
@CaptchaServiceControllerMethods()
export class CaptchaController implements CaptchaServiceController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get()
  async getCaptcha(request: EmptyReq) {
    const captcha = this.captchaService.getCaptcha();
    return captcha;
    // res.type('svg');
    // res.send(captcha.data);
  }
}
