import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';

/**
 * Return hits from an elasticsearch search response
 */
class TotalJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Transform hits in search results
   *
   * @param {object} o the object to transform
   */
  transform(o: any, options: any) {
    const res = super.transform(o, options);

    // elasticsearch version 7+ returns total as an object
    const total =
      typeof res.hits.total === 'object'
        ? res.hits.total.value
        : res.hits.total;

    return {
      total,
      totalRelation: res.hits.total.relation || '',
    };
  }
}

export default TotalJSONTransformer;
