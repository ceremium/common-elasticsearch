import SearchQuery from '../queries/SearchQuery';

/**
 * A class to transform es responses
 * @property response : the response Object from es
 */
class ElasticsearchJSONTransformer {
  transform(o: any, _options: any) {
    const res = o;
    if (res instanceof SearchQuery) {
      return o.getFilters();
    }
    return res;
  }
}

export default ElasticsearchJSONTransformer;
