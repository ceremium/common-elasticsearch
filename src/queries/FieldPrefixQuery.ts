import esb from 'elastic-builder';

import SuggestionQuery from './SuggestionQuery';

import Logger from '../logging/Logger';

class FieldPrefixQuery extends SuggestionQuery {
  /*
  {
  "query":{
    "prefix": {
      "title": {
        "value": "art"
      }
    }   
  },
  "from":0,
  "size":"10",
  "sort":[
    "_score"
  ],
  "highlight":{
    "fields":{
      "title":{
        "pre_tags":[
          "<strong>"
        ],
        "post_tags":[
          "<\/strong>"
        ]
      }
    }
  }, 
  "_source": [
      "title",
      "description",
      "image",
      "url"
  ]
}
   */
  toJSON() {
    const prefix = esb
      .requestBodySearch()
      .query(esb.prefixQuery(this.field, this.query))
      .sort(esb.sort('_score', 'desc'))
      .highlight(
        esb
          .highlight()
          .preTags('<strong>', this.field)
          .postTags('</strong>', this.field),
      );

    // set number of results
    if (this.options?.size) {
      prefix.size(this.options?.size);
    }

    // constrain fields
    if (this.options?.fields) {
      prefix.source(this.options?.fields);
    }

    const json = prefix.toJSON();
    Logger.debug(
      `FieldPrefixQuery#toJSON: json: ${JSON.stringify(json, null, 2)}`,
    );
    return json;
  }
}

export default FieldPrefixQuery;
