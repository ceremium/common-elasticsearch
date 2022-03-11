import bluebird from 'bluebird';

import BaseService from './BaseService';

import Logger from '../logging/Logger';
import { IElasticsearchSettings } from '../types/IElasticsearchSettings';
import { ISearchOptions } from '../types/ISearchOptions';

class SearchService extends BaseService {
  constructor(settings: IElasticsearchSettings, options: ISearchOptions) {
    super(settings, options);
  }

  /**
   * Run the search in ES
   */
  async search(index: string, queryOrQueries: any, options?: ISearchOptions) {
    Logger.debug(`SearchService#search: enter`);
    if (index && queryOrQueries) {
      Logger.debug(
        `ElasticsearchService#search: queryOrQueries: ${JSON.stringify(
          queryOrQueries,
          null,
          2,
        )}`,
      );
      const client = this.getClient();

      const keys = Object.keys(queryOrQueries);
      Logger.debug(`SearchService#search: keys: ${keys}`);
      const single = keys.some((key) =>
        ['size', 'query', 'aggs', 'sort', 'suggest'].includes(key),
      );
      Logger.debug(`SearchService#search: single: ${single}`);
      const queries = single ? { core: queryOrQueries } : queryOrQueries;
      Logger.debug(
        `SearchService#search: queries: ${JSON.stringify(queries, null, 2)}`,
      );

      const promises: any = {};
      for (const key of Object.keys(queries)) {
        const query = queries[key];
        Logger.debug(
          `SearchService#search: query: ${JSON.stringify(query, null, 2)}`,
        );
        const body = {
          body: query,
          index: index,
          ...options,
        };

        promises[key] = client.search(body);
      }

      const results: any = await bluebird.props(promises);
      if (single) {
        Logger.debug(`SearchService#search: exit (single)`);
        Logger.debug(
          `SearchService#search: results['core']: ${JSON.stringify(
            results.core,
          )}`,
        );
        return results.core;
      } else {
        const bodies: any = {};
        Logger.debug(`SearchService#search: exit (multiple)`);
        for (const key of Object.keys(results)) {
          const response = results[key];
          if (this.isSuccess(response)) {
            bodies[key] = this.getBody(response);
          }
        }
        return bodies;
      }
    }

    return null;
  }

  async count(index: string) {
    Logger.debug(`SearchService#count: enter`);
    const client = this.getClient();
    return await client.count({ index });
  }
}

export default SearchService;
