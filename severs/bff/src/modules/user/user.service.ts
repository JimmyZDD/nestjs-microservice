/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 15:19:55
 * @FilePath: user.service.ts
 */
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { RPCService } from '../rpc/rpc.service';
import { Token, User, CaptchaObj } from 'src/gen-code/user';

@Injectable()
export class UserService {
  constructor(private rpcService: RPCService) {}

  async login(username: string, password: string): Promise<Token> {
    return await lastValueFrom(
      this.rpcService.userServiceClient.login({ username, password }),
    );
  }

  async verify(token: string): Promise<User> {
    return await lastValueFrom(
      this.rpcService.userServiceClient.verify({ content: token }),
    );
  }

  async getCaptcha(): Promise<CaptchaObj> {
    return await lastValueFrom(
      this.rpcService.captchaServiceClient.getCaptcha({}),
    );
  }
}
