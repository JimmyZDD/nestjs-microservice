/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:01
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 22:35:32
 * @FilePath: index.ts
 */
import { Field, ObjectType, Float, Int } from '@nestjs/graphql';

@ObjectType({ description: 'actor' })
class Actor {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ObjectType({ description: 'movie' })
export class Movie {
  @Field()
  year: number;

  @Field()
  title: string;

  @Field(() => [String])
  genres: string[];

  @Field(() => [Actor])
  actors?: Actor[];
}

@ObjectType({ description: 'item' })
export class Item {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  url: string;
}

@ObjectType({ description: 'order' })
export class Order {
  @Field()
  id: number;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  createTime: number;

  @Field(() => [Item])
  items?: Item[];
}

@ObjectType({ description: 'user' })
export class User {
  @Field()
  id: number;

  @Field()
  name: string;
}
