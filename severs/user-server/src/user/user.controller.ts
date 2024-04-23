/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2024-04-23 09:52:57
 * @FilePath: user.controller.ts
 */
import { Controller, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import {
  LoginParam,
  SignupParam,
  Token,
  User,
  UserServiceController,
  UserServiceControllerMethods
} from 'src/gen-code/user';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { RedisCacheService } from './redis-cache.service';

@Controller('user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(
    private readonly jwtService: JwtService, // private userService: UserService,
    private readonly redisCacheService: RedisCacheService,
    private mailSenderService: MailSenderService
  ) {}

  verify(request: Token): User | Promise<User> | Observable<User> {
    const payload = this.jwtService.verify(request.content);
    return payload;
  }
  async login(request: LoginParam): Promise<Token> {
    // const user = await this.userService.findOne({ name: request.username });
    // if (user) {
    //   if (await compare(request.password, user.password)) {
    //     return {
    //       content: this.jwtService.sign({
    //         id: user.id,
    //         name: user.name,
    //       }),
    //     };
    //   }
    // }
    const user = {
      id: 1,
      username: request.username
    };

    const token = this.jwtSign(user);
    await this.redisCacheService.cacheSet(
      `${user.id}&${user.username}`,
      token,
      1800
    );

    this.validate(token, user);

    return {
      content: token
    };
  }

  private jwtSign(user) {
    return this.jwtService.sign({ id: user.id, name: user.username });
  }

  private sendEmail() {
    this.mailSenderService.sendVerifyEmailMail(
      'ayou',
      '445305451@qq.com',
      'token'
    );
  }

  // 在验证token时， 从redis中取token，如果取不到token，可能是token已过期。
  async validate(token, user) {
    const cacheToken = await this.redisCacheService.cacheGet(
      `${user.id}&${user.username}`
    );
    console.log({ token, cacheToken });

    if (!cacheToken) {
      throw new UnauthorizedException('token 已过期');
    }
    ///
    // 用户唯一登录;
    // 当用户登录时，每次签发的新的token,会覆盖之前的token, 判断redis中的token与请求传入的token是否相同，
    // 不相同时， 可能是其他地方已登录， 提示token错误。
    if (token != cacheToken) {
      throw new UnauthorizedException('token不正确');
    }
    // const existUser = await this.authService.getUser(user);
    // if (!existUser) {
    //   throw new UnauthorizedException('token不正确');
    // }
    /**
     * 然后再token认证通过后，重新设置过期时间， 因为使用的cache-manager没有通过直接更新有效期方法，
     * 通过重新设置来实现：
     * token自动续期
     * 实现方案有多种，可以后台jwt生成access_token（jwt有效期30分钟）和refresh_token, refresh_token有效期比access_token有效期长，
     * 客户端缓存此两种token， 当access_token过期时， 客户端再携带refresh_token获取新的access_token。 这种方案需要接口调用的开发人员配合。
     * 纯后端实现的token自动续期
     * 实现流程:
     * ①：jwt生成token时，有效期设置为用不过期
     * ②：redis 缓存token时设置有效期30分钟
     * ③：用户携带token请求时， 如果key存在，且value相同， 则重新设置有效期为30分钟
     */
    // this.redisCacheService.cacheSet(`${user.id}&${user.username}`, token, 1800);

    return user;
  }

  async signup(request: SignupParam): Promise<Token> {
    // const user = await this.userService.findOne({ name: request.username });
    // if (user?.name === request.username) return { content: null };
    // const id = await this.userService.insertOne(
    //   request.username,
    //   request.password,
    // );
    // return { content: this.jwtService.sign({ id, name: request.username }) };

    return {
      content: this.jwtService.sign({ id: 1, name: 'ayou' })
    };
  }
}
