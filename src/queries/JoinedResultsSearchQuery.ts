import esb from 'elastic-builder';
import AggregationSearchQuery from './AggregationSearchQuery';

class JoinedResultsSearchQuery extends AggregationSearchQuery {
  buildArrayFilter(query: any, key: string, values: Array<string>): void {
    const bool = esb.boolQuery();

    if (values && Array.isArray(values)) {
      for (const value of values) {
        bool.should(esb.matchQuery(key, value));
      }
    }

    query.filter(bool);
  }
}

export default JoinedResultsSearchQuery;
