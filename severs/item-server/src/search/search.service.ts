import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as moviesJson from '../../movies.json';
import { ConfigService } from '@nestjs/config';

interface MoviesJsonResponse {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
}

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private config: ConfigService
  ) {}

  async createIndex() {
    const isIndexExist = await this.esService.indices.exists({
      index: this.config.get('ELASTICSEARCH_INDEX')
    });
    if (!isIndexExist) {
      this.esService.indices.create({
        index: this.config.get('ELASTICSEARCH_INDEX'),
        body: {
          settings: {
            // analysis: {
            //   analyzer: {
            //     autocomplete_analyzer: {
            //       tokenizer: 'autocomplete',
            //       filter: ['lowercase']
            //     },
            //     autocomplete_search_analyzer: {
            //       tokenizer: 'keyword',
            //       filter: ['lowercase']
            //     }
            //   },
            //   tokenizer: {
            //           autocomplete: {
            //             type: 'edge_ngram',
            //             min_gram: 1,
            //             max_gram: 30,
            //             token_chars: ['letter', 'digit', 'whitespace']
            //           }
            //         }
            //       }
            // }
          },
          mappings: {
            properties: {
              title: {
                type: 'text',
                fields: {
                  complete: {
                    type: 'text',
                    analyzer: 'autocomplete_analyzer',
                    search_analyzer: 'autocomplete_search_analyzer'
                  }
                }
              },
              year: { type: 'integer' },
              genres: { type: 'nested' },
              actors: { type: 'nested' }
            }
          }
        }
      });
      const body = await this.parseAndPrepareData();
      this.esService.bulk({
        index: this.config.get('ELASTICSEARCH_INDEX'),
        body
      });
    }
  }

  async search(search: string) {
    const results = [];
    const response = await this.esService.search({
      index: this.config.get('ELASTICSEARCH_INDEX'),
      body: {
        size: 12,
        query: {
          match: {
            'title.complete': {
              query: search
            }
          }
        }
      }
    });

    const hits = response.hits.hits;
    hits.map((item: any) => {
      console.log(item._source);
      let { genres } = item._source;

      genres = genres.map((item) => item.genre);

      results.push({ ...item._source, genres });
    });
    console.log(results);

    return { list: results, total: results.length };
  }

  async parseAndPrepareData() {
    const body = [];
    const listMovies: MoviesJsonResponse[] = moviesJson;
    listMovies.map((item, index) => {
      const actorsData = [];
      item.cast.map((actor) => {
        const splited = actor.split(' ');
        actorsData.push({ firstName: splited[0], lastName: splited[1] });
      });

      body.push(
        {
          index: {
            _index: this.config.get('ELASTICSEARCH_INDEX'),
            _id: index
          }
        },
        {
          title: item.title,
          year: item.year,
          genres: item.genres.map((genre) => ({ genre })),
          actors: actorsData
        }
      );
    });
    return body;
  }
}
