import SearchQueryDecorator from './SearchQueryDecorator';
/**
 * Decorate search queries with wildcards around queries
 */
class WildcardSearchQueryDecorator extends SearchQueryDecorator {
  constructor() {
    super();
  }

  decorate(query: any) {
    // add wildcards if not already set
    if (query.q && !(query.q.indexOf('*') > -1)) {
      query.q = `${query.q}*`;
    }

    return query;
  }
}

export default WildcardSearchQueryDecorator;
