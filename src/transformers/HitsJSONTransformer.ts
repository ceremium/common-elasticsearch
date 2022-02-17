import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';

/**
 * Return hits from an elasticsearch search response
 */
class HitsJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Transform hits in search results
   *
   * @param {object} o the object to transform
   */
  transform(o: any, options?: any) {
    const res = super.transform(o, options);

    return res.hits.hits;
  }
}

export default HitsJSONTransformer;
