/*
 * @Author: zdd
 * @Date: 2023-11-23 21:34:05
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 21:51:19
 * @FilePath: search.module.ts
 */
import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        node: config.get('ELASTICSEARCH_NODE'),
        auth: {
          username: config.get('ELASTICSEARCH_USERNAME'),
          password: config.get('ELASTICSEARCH_PASSWORD')
        },
        tls: {
          rejectUnauthorized: false
        },
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true
      }),
      inject: [ConfigService]
    })
  ],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule implements OnModuleInit {
  constructor(private searchService: SearchService) {}
  onModuleInit() {
    this.searchService.createIndex().then();
  }
}
