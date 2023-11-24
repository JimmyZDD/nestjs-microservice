/*
 * @Author: zdd
 * @Date: 2023-11-23 21:59:08
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 21:59:35
 * @FilePath: movie.service.ts
 */
import { Injectable } from '@nestjs/common';
import { SearchService } from '../search/search.service';

@Injectable()
export class MovieService {
  constructor(readonly esService: SearchService) {}

  async findMovies(search = '') {
    return await this.esService.search(search);
  }
}
