/*
 * @Author: zdd
 * @Date: 2023-11-21 10:28:12
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-21 10:32:56
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
      package: 'user',
      protoPath: join(__dirname, '../../../proto/user.proto'),
      url: 'localhost:9003'
    }
  });
  await app.listen();
  console.log('user-server listen http://localhost:9003');
}
bootstrap();
