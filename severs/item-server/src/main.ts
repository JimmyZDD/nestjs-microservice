/*
 * @Author: zdd
 * @Date: 2023-11-21 10:27:22
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-21 10:34:10
 * @FilePath: main.ts
 */
import { NestFactory } from '@nestjs/core';
import { Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'item',
      protoPath: join(__dirname, '../../../proto/item.proto'),
      url: 'localhost:9001'
    }
  });
  await app.listen();
  console.log('item-server listen http://localhost:9001');
}
bootstrap();
