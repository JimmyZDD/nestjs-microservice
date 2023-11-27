/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-26 18:33:36
 * @FilePath: rpc.module.ts
 */
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { RPCService } from './rpc.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'ITEM_RPC_CLIENT',
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              url: `${configService.get('ITEM_RPC_URL')}`,
              package: 'item',
              protoPath: join(__dirname, '../../proto/item.proto'),
            },
          }),
          inject: [ConfigService],
        },
        {
          name: 'ORDER_RPC_CLIENT',
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              url: `${configService.get('ORDER_RPC_URL')}`,
              package: 'order',
              protoPath: join(__dirname, '../../proto/order.proto'),
              loader: {
                longs: Number,
              },
            },
          }),
          inject: [ConfigService],
        },
        {
          name: 'USER_RPC_CLIENT',
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              url: `${configService.get('USER_RPC_URL')}`,
              package: 'user',
              protoPath: join(__dirname, '../../proto/user.proto'),
              loader: {
                longs: Number,
              },
            },
          }),
          inject: [ConfigService],
        },
      ],
    }),
    // ClientsModule.register([
    //   {
    //     name: 'ITEM_RPC_CLIENT',
    //     transport: Transport.GRPC,
    //     options: {
    //       url: 'localhost:9001',
    //       package: 'item',
    //       protoPath: join(__dirname, '../../proto/item.proto'),
    //     },
    //   },
    //   {
    //     name: 'ORDER_RPC_CLIENT',
    //     transport: Transport.GRPC,
    //     options: {
    //       url: 'localhost:9002',
    //       package: 'order',
    //       protoPath: join(__dirname, '../../proto/order.proto'),
    //       loader: {
    //         longs: Number,
    //       },
    //     },
    //   },
    //   {
    //     name: 'USER_RPC_CLIENT',
    //     transport: Transport.GRPC,
    //     options: {
    //       url: 'localhost:9003',
    //       package: 'user',
    //       protoPath: join(__dirname, '../../proto/user.proto'),
    //       loader: {
    //         longs: Number,
    //       },
    //     },
    //   },
    // ]),
  ],
  providers: [RPCService],
  exports: [RPCService],
})
export class RPCModule {}
