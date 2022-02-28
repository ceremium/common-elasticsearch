import esb from 'elastic-builder';

import Logger from '../logging/Logger';

interface ISuggestionQueryOptions {
  fuzziness?: number;
  fields?: Array<string>;
  size?: number;
}

class SuggestionQuery {
  field: string;
  query: string;
  options: ISuggestionQueryOptions;

  constructor(
    field: string,
    query: string,
    options: ISuggestionQueryOptions = {},
  ) {
    this.field = field;
    this.query = query;
    this.options = options;
  }

  toJSON() {
    const name = this.field.replace('.', '_');
    const completion = esb
      .completionSuggester(name, this.field)
      .prefix(this.query)
      .skipDuplicates(true);

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

    const json = suggest.toJSON();
    Logger.debug(
      `SuggestionQuery#toJSON: json: ${JSON.stringify(json, null, 2)}`,
    );
    return json;
  }
}

export default SuggestionQuery;
