/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 11:31:47
 * @FilePath: user.controller.ts
 */
import { Controller } from '@nestjs/common';
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

@Controller('user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(
    private readonly jwtService: JwtService // private userService: UserService,
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

    // return { content: null };

    return {
      content: this.jwtService.sign({ id: 1, name: 'ayou' })
    };
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
