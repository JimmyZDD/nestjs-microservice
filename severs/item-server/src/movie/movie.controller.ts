/*
 * @Author: zdd
 * @Date: 2023-11-23 21:59:08
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-23 23:04:19
 * @FilePath: movie.controller.ts
 */
import { Controller } from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  MovieServiceController,
  MovieServiceControllerMethods,
  Movies
} from 'src/gen-code/item';

@Controller('movie')
@MovieServiceControllerMethods()
export class MovieController implements MovieServiceController {
  constructor(public readonly movieService: MovieService) {}

  async getMovies({ search }): Promise<Movies> {
    if (!search === undefined || typeof search !== 'string') {
      search = '';
    }
    console.log('search', search);

    return await this.movieService.findMovies(search);
  }
}
