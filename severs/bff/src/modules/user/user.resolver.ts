/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 16:50:56
 * @FilePath: user.resolver.ts
 */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { User } from 'src/models';
import { UserService } from './user.service';
import { Session } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => String)
  async login(
    @Context() context,
    @Args('username', { type: () => String }) username: string,
    @Args('password', { type: () => String }) password: string,
    @Args('captcha', { type: () => String }) captcha: string,
  ) {
    if (
      context.res.req.session.captcha.toLowerCase() !== captcha.toLowerCase()
    ) {
      throw new Error('验证码错误');
    }

    const token = await this.userService.login(username, password);
    return token.content;
  }

  @Query(() => User)
  async user(@Args('token', { type: () => String }) token: string) {
    const user = await this.userService.verify(token);
    return user;
  }
}
