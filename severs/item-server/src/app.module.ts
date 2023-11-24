/*
 * @Author: zdd
 * @Date: 2023-11-21 10:27:22
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 22:00:37
 * @FilePath: app.module.ts
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { SearchModule } from './search/search.module';
import { MovieModule } from './movie/movie.module';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SearchModule,
    MovieModule
  ]
})
export class AppModule {}
