/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Pagination } from "./common";

export const protobufPackage = "item";

export interface ItemById {
  id: number;
}

export interface Item {
  id: number;
  name: string;
  url: string;
}

export interface Items {
  list: Item[];
}

export interface MovieQuery {
  search: string;
}

export interface Actor {
  firstName: string;
  lastName: string;
}

export interface Movie {
  year: number;
  title: string;
  genres: string[];
  actors: Actor[];
}

export interface Movies {
  total: number;
  list: Movie[];
}

export const ITEM_PACKAGE_NAME = "item";

export interface ItemServiceClient {
  findOne(request: ItemById): Observable<Item>;

  getItems(request: Pagination): Observable<Items>;
}

export interface ItemServiceController {
  findOne(request: ItemById): Promise<Item> | Observable<Item> | Item;

  getItems(request: Pagination): Promise<Items> | Observable<Items> | Items;
}

export function ItemServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "getItems"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ItemService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ItemService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEM_SERVICE_NAME = "ItemService";

export interface MovieServiceClient {
  getMovies(request: MovieQuery): Observable<Movies>;
}

export interface MovieServiceController {
  getMovies(request: MovieQuery): Promise<Movies> | Observable<Movies> | Movies;
}

export function MovieServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getMovies"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MovieService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MovieService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MOVIE_SERVICE_NAME = "MovieService";
