import BlacklistJSONTransformer from './BlacklistJSONTransformer';
import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';

const BLACKLIST = ['page', 'per', 'sort', 'order', 'whitelist'];

/**
 * Transform a search that was sent to elasticsearch
 */
class SearchQueryJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Transform metadata from search results
   *
   * @param {object} o the query to transform
   * @param {array} options.blacklist optional list of blacklisted attributes
   */
  transform(o: any, options: any = {}) {
    const res = super.transform(o, options);

    // use the default black list unless one was passed in
    if (!options.blacklist) {
      options.blacklist = BLACKLIST;
    }

    return new BlacklistJSONTransformer().transform(res, options);
  }
}

export default SearchQueryJSONTransformer;
