/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 15:17:41
 * @FilePath: rpc.service.ts
 */
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ItemServiceClient, ITEM_SERVICE_NAME } from 'src/gen-code/item';
import { OrderServiceClient, ORDER_SERVICE_NAME } from 'src/gen-code/order';
import {
  UserServiceClient,
  USER_SERVICE_NAME,
  CAPTCHA_SERVICE_NAME,
  CaptchaServiceClient,
} from 'src/gen-code/user';

@Injectable()
export class RPCService implements OnModuleInit {
  public itemServiceClient: ItemServiceClient;
  public orderServiceClient: OrderServiceClient;
  public userServiceClient: UserServiceClient;
  public captchaServiceClient: CaptchaServiceClient;

  constructor(
    @Inject('ITEM_RPC_CLIENT') private itemRPCClient: ClientGrpc,
    @Inject('ORDER_RPC_CLIENT') private orderRPCClient: ClientGrpc,
    @Inject('USER_RPC_CLIENT') private userRPCClient: ClientGrpc,
    @Inject('USER_RPC_CLIENT') private captchaRPCClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.itemServiceClient =
      this.itemRPCClient.getService<ItemServiceClient>(ITEM_SERVICE_NAME);
    this.orderServiceClient =
      this.orderRPCClient.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    this.userServiceClient =
      this.userRPCClient.getService<UserServiceClient>(USER_SERVICE_NAME);
    this.captchaServiceClient =
      this.captchaRPCClient.getService<CaptchaServiceClient>(
        CAPTCHA_SERVICE_NAME,
      );
  }
}
