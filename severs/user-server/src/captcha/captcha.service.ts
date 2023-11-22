/*
 * @Author: zdd
 * @Date: 2023-11-22 14:25:31
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 14:28:25
 * @FilePath: captcha.service.ts
 */
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 2
    });
    return captcha;
  }
}
