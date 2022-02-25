import esb from 'elastic-builder';
import SearchQuery from './SearchQuery';

class AggregationSearchQuery extends SearchQuery {
  aggregations: any;
  constructor(filters: any) {
    super(filters);
  }

  setAggregations(aggregations: any) {
    this.aggregations = aggregations;
    this.dirty = true;
  }

  buildSearchQuery(filters = this.filters) {
    super.buildSearchQuery(filters);
    if (this.aggregations && this.aggregations.aggs) {
      const { aggs } = this.aggregations;
      const fields = Object.keys(aggs);
      fields.forEach((field) => {
        if (aggs[field].terms) {
          this.body.agg(esb.termsAggregation(field, aggs[field].terms.field));
        } else if (aggs[field].range) {
          this.body.agg(
            esb
              .rangeAggregation(field, aggs[field].range.field)
              .ranges(aggs[field].range.ranges),
          );
        }
      });
    }
  }
}

export default AggregationSearchQuery;
