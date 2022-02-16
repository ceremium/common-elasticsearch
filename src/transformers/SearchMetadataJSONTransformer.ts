import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';

/**
 * Return search metada with an elasticsearch search results
 */
class SearchMetadataJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Transform metadata from search results
   *
   * @param {object} o the object to transform
   */
  transform(o: any, options: any) {
    const res = super.transform(o, options);

    const { took, hits } = res;

    return {
      speed: took,
      maxRelevance: hits.max_score,
    };
  }
}

export default SearchMetadataJSONTransformer;
