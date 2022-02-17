import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';
import PaginationJSONTransformer from './PaginationJSONTransformer';
import SearchMetadataJSONTransformer from './SearchMetadataJSONTransformer';
import TotalJSONTransformer from './TotalJSONTransformer';

/**
 * Return results from an elasticsearch search response
 */
class SearchResultsJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Transform search results into an aggregate response
   *
   * @param {object} o the object to transform
   */
  transform(o: any, options: any = {}) {
    const res = super.transform(o, options);

    // pagination options
    if (!options.page) {
      options.page = 1;
    }
    if (!options.per) {
      options.per = 10;
    }

    const pagination = new PaginationJSONTransformer().transform(res, options);
    const { total, totalRelation } = new TotalJSONTransformer().transform(
      res,
      options,
    );
    const metadata = new SearchMetadataJSONTransformer().transform(
      res,
      options,
    );

    return {
      pagination,
      metadata,
      total,
      totalRelation,
    };
  }
}

export default SearchResultsJSONTransformer;
