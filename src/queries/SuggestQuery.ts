import esb from 'elastic-builder';

interface ISuggestQueryOptions {
  fuzziness?: number;
  fields?: Array<string>;
  size?: number;
}

class SuggestQuery {
  field: string;
  query: string;
  options: ISuggestQueryOptions;

  constructor(
    field: string,
    query: string,
    options: ISuggestQueryOptions = {},
  ) {
    this.field = field;
    this.query = query;
    this.options = options;
  }

  toJSON() {
    const completion = esb
      .completionSuggester(this.field, this.field)
      .prefix(this.query);

    // allow fuzziness
    if (this.options?.fuzziness) {
      completion.fuzziness(this.options?.fuzziness);
    }

    // set number of results
    if (this.options?.size) {
      completion.size(this.options?.size);
    }

    const suggest = esb.requestBodySearch().suggest(completion);

    // constrain fields
    if (this.options?.fields) {
      suggest.source(this.options?.fields);
    }

    return suggest.toJSON();
  }
}

export default SuggestQuery;
