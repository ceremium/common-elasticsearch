import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';

/**
 * Return aggregations from an elasticsearch search response
 */
class AggregationsJSONTransformer extends ElasticsearchJSONTransformer {
  transform(o: any, options: any = {}) {
    const res = super.transform(o, options);

    const aggregations = res.aggregations ? res.aggregations : {};

    return aggregations;
  }
}

export default AggregationsJSONTransformer;
