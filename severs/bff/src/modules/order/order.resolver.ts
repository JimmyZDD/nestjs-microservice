/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-25 12:16:54
 * @FilePath: order.resolver.ts
 */
import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/user';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Order, User } from 'src/models';
import { Order as OrderFromRPC } from 'src/gen-code/order';
import { ItemService } from '../item/item.service';
import { OrderService } from './order.service';

@Resolver(() => Order)
@UseGuards(JwtAuthGuard)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly itemService: ItemService,
  ) {}

  @Query(() => Order)
  async order(
    @Args('id', { type: () => ID }) id: number,
    @CurrentUser() user: User,
  ) {
    const order = await this.orderService.findOne(id, user);
    return order;
  }

  @ResolveField()
  async items(@Parent() order: OrderFromRPC) {
    const { itemIds } = order;
    const items = [];
    for (let i = 0; i < itemIds.length; i++) {
      const itemId = itemIds[i];
      const item = await this.itemService.findOne(itemId);
      items.push(item);
    }

    return items;
  }
}
