/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 11:11:56
 * @FilePath: order.service.ts
 */
import { Injectable } from '@nestjs/common';
import { Order } from '../../gen-code/Order';
import { lastValueFrom } from 'rxjs';
import { RPCService } from '../rpc/rpc.service';
import { User } from 'src/models';

@Injectable()
export class OrderService {
  constructor(private rpcService: RPCService) {}

  async findOne(id: number, user: User): Promise<Order> {
    return await lastValueFrom(
      this.rpcService.orderServiceClient.findOne({ id, userId: user.id }),
    );
  }
}
