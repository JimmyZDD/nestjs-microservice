/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { EmptyReq } from "./common";

export const protobufPackage = "user";

export interface Token {
  content: string;
}

export interface User {
  id: number;
  name: string;
}

export interface LoginParam {
  username: string;
  password: string;
}

export interface SignupParam {
  username: string;
  password: string;
  sessionId: string;
  captcha: string;
}

export interface CaptchaObj {
  text: string;
  data: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  verify(request: Token): Observable<User>;

  login(request: LoginParam): Observable<Token>;

  signup(request: SignupParam): Observable<Token>;
}

export interface UserServiceController {
  verify(request: Token): Promise<User> | Observable<User> | User;

  login(request: LoginParam): Promise<Token> | Observable<Token> | Token;

  signup(request: SignupParam): Promise<Token> | Observable<Token> | Token;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["verify", "login", "signup"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

export interface CaptchaServiceClient {
  getCaptcha(request: EmptyReq): Observable<CaptchaObj>;
}

export interface CaptchaServiceController {
  getCaptcha(request: EmptyReq): Promise<CaptchaObj> | Observable<CaptchaObj> | CaptchaObj;
}

export function CaptchaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getCaptcha"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CaptchaService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CaptchaService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CAPTCHA_SERVICE_NAME = "CaptchaService";
