import ElasticsearchJSONTransformer from './ElasticsearchJSONTransformer';

class SuggestionJSONTransformer extends ElasticsearchJSONTransformer {
  /**
   * Transform metadata from search results
   *
   * @param {object} o the object to transform
   */
  transform(o: any, options: any = {}) {
    const results = [];

    if (o.suggest) {
      const suggestions = Object.keys(o.suggest);
      for (const suggestion of suggestions) {
        const response: Array<any> = o.suggest[suggestion];
        for (const result of response) {
          if (result.options) {
            for (const option of result.options) {
              results.push(option._source);
            }
          }
        }
      }
    }

    return results;
  }
}

export default SuggestionJSONTransformer;
