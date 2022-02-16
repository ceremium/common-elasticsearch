import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';
import TotalJSONTransformer from './TotalJSONTransformer';

/**
 * Transform results from an elasticsearch search
 * providing pagination
 */
class PaginationJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Transform pagination results
   *
   * @param {object} o the object to transform
   * @param {number} options.page default page
   * @param {number} options.per default per
   */
  transform(o: any, options: any) {
    const res = super.transform(o, options);

    const page = parseInt(res.page || options.page);
    const per = parseInt(res.per || options.per);

    const { total } = new TotalJSONTransformer().transform(res, options);

    const previous = page === 1 ? 1 : page - 1;
    const next = per * page > total ? page : page + 1;
    const pages = Math.ceil(total / per);

    return {
      per,
      page,
      previous,
      next,
      pages,
    };
  }
}

export default PaginationJSONTransformer;
