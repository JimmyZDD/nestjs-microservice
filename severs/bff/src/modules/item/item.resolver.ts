/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 22:22:33
 * @FilePath: item.resolver.ts
 */
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Int } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Item, Movie } from 'src/models';
import { ItemService } from './item.service';

@Resolver(() => Item)
@UseGuards(JwtAuthGuard)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => Item)
  async item(@Args('id', { type: () => ID }) id: number) {
    return this.itemService.findOne(id);
  }

  @Query(() => [Item])
  async items(
    @Args('page', { type: () => Int }) page: number,
    @Args('pageSize', { type: () => Int }) pageSize: number,
  ) {
    const items = await this.itemService.getItems(page, pageSize);
    return items;
  }

  @Query(() => [Movie])
  async movies(@Args('search', { type: () => String }) search: string) {
    const items = await this.itemService.getMovies(search);
    return items;
  }
}
