import { IIndexOptions } from './IIndexOptions';
import { ISearchOptions } from './ISearchOptions';

interface IElasticsearchOptions {
  search?: ISearchOptions;
  index?: IIndexOptions;
}
export { IElasticsearchOptions };
