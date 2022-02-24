import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';
import AggregationsJSONTransformer from './AggregationsJSONTransformer';

/**
 * Transform choice ranges from elasticsearch results
 */
class ChoicesJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Convert aggregations into choices containing either
   * - categories and counts for keywords
   * - min and max for ranges (numbers and dates)
   *
   * @param {object} o a result
   */
  async transform(o: any, options: any = {}) {
    const res = super.transform(o, options);
    const { titles = {}, formats = {} } = options;
    const aggregations = new AggregationsJSONTransformer().transform(
      res,
      options,
    );

    // response object
    const choices = {};

    if (aggregations) {
      const aggregationKeys = Object.keys(aggregations);
      for (const key of aggregationKeys) {
        const aggregation = aggregations[key];
        if (aggregation) {
          const isRange = key.startsWith('max_') || key.startsWith('min_');
          if (isRange) {
            this.transformRangeAggregation(
              choices,
              key,
              aggregation,
              titles,
              formats,
            );
          } else {
            await this.transformTermAggregation(
              choices,
              key,
              aggregation,
              titles,
            );
          }
        }
      }
    }
    return choices;
  }

  transformRangeAggregation(
    choices: any,
    key: string,
    aggregation: any,
    titles: any,
    formats: any,
  ) {
    // will have a min and max
    const rangeKey = key.substring(4);
    if (!choices[rangeKey]) {
      choices[rangeKey] = {};
    }
    if (titles[rangeKey]) {
      choices[rangeKey].title = titles[rangeKey].title;
      choices[rangeKey].titles = titles[rangeKey].titles;
    }

    const type = key.startsWith('min_') ? 'min' : 'max';

    if (
      formats[rangeKey] &&
      (formats[rangeKey].format === 'date' ||
        formats[rangeKey].format === 'date-time')
    ) {
      choices[rangeKey][type] = new Date(aggregation.value).toISOString();
    } else {
      choices[rangeKey][type] =
        aggregation.value_as_string || aggregation.value;
    }
  }

  async transformTermAggregation(
    choices: any,
    key: string,
    aggregation: any = {},
    titles: any = {},
  ) {
    const keys = Object.keys(aggregation);

    const hasBuckets = keys.includes('buckets');
    const hasAggregatableBuckets =
      hasBuckets &&
      aggregation.buckets.every((bucket: any) => {
        return (
          Object.keys(bucket).includes('key') &&
          Object.keys(bucket).includes('doc_count')
        );
      });
    const hasDocCountErrorUpperBound = keys.includes(
      'doc_count_error_upper_bound',
    );
    const hasSumOtherDocCount = keys.includes('sum_other_doc_count');

    // will have categories and counts
    const buckets = aggregation.buckets;

    if (
      hasAggregatableBuckets ||
      (hasDocCountErrorUpperBound && hasSumOtherDocCount)
    ) {
      const choice = [];
      if (hasBuckets && Array.isArray(buckets)) {
        for (const bucket of buckets) {
          const category = this.getBucketCategory(bucket);
          const count = bucket.doc_count;

          choice.push({
            key: category,
            count,
          });
        }
      }

      choices[key] = {};
      if (titles[key]) {
        choices[key].title = titles[key].title;
        choices[key].titles = titles[key].titles;
      }

      choices[key].choices = choice;
    } else {
      for (const childKey of keys) {
        if (childKey !== 'doc_count') {
          const compositeKey = `${key}.${childKey}`;
          await this.transformTermAggregation(
            choices,
            compositeKey,
            aggregation[childKey],
            titles,
          );
        }
      }
    }
  }

  /**
   * Handle booleans keys
   * @param {*} bucket
   */
  getBucketCategory(bucket: any) {
    if (bucket.key === 0 && bucket.key_as_string === 'false') {
      return false;
    } else if (bucket.key === 1 && bucket.key_as_string === 'true') {
      return true;
    } else {
      return bucket.key;
    }
  }
}

export default ChoicesJSONTransformer;
