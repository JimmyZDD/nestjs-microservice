/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 22:19:28
 * @FilePath: item.service.ts
 */
import { Injectable } from '@nestjs/common';
import { Item, Movies } from '../../gen-code/item';
import { lastValueFrom } from 'rxjs';
import { RPCService } from '../rpc/rpc.service';

@Injectable()
export class ItemService {
  constructor(private rpcService: RPCService) {}

  async findOne(id: number): Promise<Item> {
    return await lastValueFrom(
      this.rpcService.itemServiceClient.findOne({ id }),
    );
  }

  async getItems(page: number, pageSize: number): Promise<Item[]> {
    const items = await lastValueFrom(
      this.rpcService.itemServiceClient.getItems({ page, pageSize }),
    );
    return items.list;
  }

  async getMovies(search: string): Promise<Movies['list']> {
    const items = await lastValueFrom(
      this.rpcService.movieServiceClient.getMovies({ search }),
    );
    return items.list;
  }
}
