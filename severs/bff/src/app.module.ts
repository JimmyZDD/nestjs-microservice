/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-26 17:52:59
 * @FilePath: app.module.ts
 */
import {
  AbstractGraphQLDriver,
  GqlModuleOptions,
  GraphQLModule,
} from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { graphqlHTTP } from 'express-graphql';
import { ItemModule } from './modules/item/item.module';
import { RPCModule } from './modules/rpc/rpc.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

class ExpressGraphQLDriver extends AbstractGraphQLDriver {
  async stop(): Promise<void> {
    console.log('stop');
  }
  async start(options: GqlModuleOptions<any>): Promise<void> {
    options = await this.graphQlFactory.mergeWithSchema(options);
    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.use(
      '/graphql',
      graphqlHTTP({
        schema: options.schema,
        graphiql: true,
      }),
    );
  }
}

// 环境变量加载
const envFilePath = ['.env'];
if (process.env.DOTENV) {
  envFilePath.unshift(`.env.${process.env.DOTENV}`);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    RPCModule,
    ItemModule,
    OrderModule,
    UserModule,
    GraphQLModule.forRoot({
      driver: ExpressGraphQLDriver,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
