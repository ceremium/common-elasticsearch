import esb from 'elastic-builder';

// constants
const FILTERS_BLACKLIST = [
  'per',
  'page',
  'sort',
  'order',
  'q',
  'whitelist',
  'size',
  'suggest',
  'source',
];

const DEFAULT_PAGE = 1;
const DEFAULT_PER = 10;

/**
 * Creates a search query object
 */
class SearchQuery {
  filters: any;
  dirty: boolean;
  per: number | undefined;
  page!: number;
  sort!: string | undefined;
  order!: string | undefined;
  q!: string | undefined;
  suggest!: any;
  source!: boolean;
  size!: number;
  body: any;
  highlight: any;
  /**
   * The constructor
   * @param {*} filters
   */
  constructor(filters: any) {
    this.filters = filters;
    // indicates whether it's necessary to rebuild the query
    this.dirty = true;

    this.initialize();
    this.prepare();
  }

  /**
   * Initialise values
   */
  initialize() {
    this.setQ(undefined);
    this.setPage(DEFAULT_PAGE);
    this.setSort(undefined);
    this.setOrder(undefined);
    this.setSize(DEFAULT_PER);
    this.setSuggest(undefined);
    this.setSource(false);
  }

  /**
   * Prepare the query
   */
  prepare() {
    if (
      this.filters &&
      this.filters.q &&
      typeof this.filters.q !== 'undefined'
    ) {
      this.setQ(this.filters.q);
      delete this.filters.q;
    }
    if (
      this.filters &&
      this.filters.page &&
      typeof this.filters.page !== 'undefined'
    ) {
      this.setPage(this.filters.page);
      delete this.filters.page;
    }
    if (
      this.filters &&
      this.filters.sort &&
      typeof this.filters.sort !== 'undefined'
    ) {
      this.setSort(this.filters.sort);
      delete this.filters.sort;
    }
    if (
      this.filters &&
      this.filters.order &&
      typeof this.filters.order !== 'undefined'
    ) {
      this.setOrder(this.filters.order);
      delete this.filters.order;
    }
    if (
      this.filters &&
      this.filters.per &&
      typeof this.filters.per !== 'undefined'
    ) {
      this.per = this.filters.per; // hold in state - proxy for size
      this.setSize(this.filters.per);
      delete this.filters.per;
    }
    if (this.filters.suggest) {
      this.setSuggest(this.filters.suggest);
    }
    if (this.filters.source) {
      this.setSource(this.filters.source);
    }

    this.buildSearchQuery();
  }

  /**
   * Set page
   * @param {*} page
   */
  setPage(page = 1) {
    this.page = page;
    this.dirty = true;
  }

  getPage() {
    return this.page;
  }

  /**
   * Set sort
   * @param {*} sort
   */
  setSort(sort: string | undefined) {
    this.sort = sort;
    this.dirty = true;
  }

  getSort() {
    return this.sort;
  }

  /**
   * Set order
   * @param {*} order
   */
  setOrder(order: string | undefined) {
    this.order = order;
    this.dirty = true;
  }

  getOrder() {
    return this.order;
  }

  /**
   * Set q
   * @param {*} q
   */
  setQ(q: string | undefined) {
    this.q = q;
    this.dirty = true;
  }

  getQ() {
    return this.q;
  }

  /**
   * Set suggest
   * @param {*} suggest
   */
  setSuggest(suggest: any | undefined) {
    this.suggest = suggest;
    this.dirty = true;
  }

  /**
   * Set source
   * @param {*} source
   */
  setSource(source: any) {
    this.source = source;
    this.dirty = true;
  }

  /**
   * Set size
   * @param {*} size
   */
  setSize(size = 10) {
    this.size = size;
    this.dirty = true;
  }

  getSize() {
    return this.size;
  }

  /**
   * Set filters
   * @param {*} q
   */
  setFilters(filters: any) {
    this.filters = filters;
    this.dirty = true;
  }

  /**
   * Get the filters
   */
  getFilters() {
    return this.filters;
  }

  setHighlight(highlight: any) {
    this.highlight = highlight;
    this.dirty = true;
  }

  /**
   * Add pagination
   */
  paginate() {
    const from = this.size * (this.page - 1);
    this.body.from(from).size(this.size);
  }

  isKeyBlacklisted(key?: string) {
    if (key) {
      return FILTERS_BLACKLIST.includes(key);
    }
    return false;
  }

  getKeyType(key?: string, value?: any) {
    if (key === 'ids') {
      return 'ids';
    } else if (Array.isArray(value)) {
      return 'array';
    } else if (key && (key.endsWith('.min') || key.endsWith('.max'))) {
      return 'range';
    } else {
      return 'simple';
    }
  }

  getRangeKey(key?: string) {
    if (key) {
      const ranges = key.split('.');
      ranges.pop();
      return ranges.join('.');
    }

    return null;
  }

  getRangeType(key?: string) {
    if (key) {
      const type = key.substring(key.lastIndexOf('.') + 1);

      if (['min', 'max'].includes(type)) {
        return type;
      }
    }

    return null;
  }

  hasFilters() {
    if (this.filters) {
      return !!Object.keys(this.filters).length;
    }
    return false;
  }

  /**
   * This search query requires multiple searches
   */
  isMulti() {
    return false;
  }

  /**
   * Build the array filter to query
   * @param {*} query
   * @param {*} key
   * @param {*} values
   */
  buildArrayFilter(query: any, key: string, values: Array<string>) {
    const bool = esb.boolQuery();

    if (values && Array.isArray(values)) {
      for (const value of values) {
        bool.should(esb.matchQuery(key, value));
      }
    }

    query.filter(bool);
  }

  extractRangeFilters(filters: any) {
    if (filters) {
      const keys = Object.keys(filters);

      const rangeFilters: any = {};

      for (const key of keys) {
        const value = filters[key];

        const keyType = this.getKeyType(key, value);
        if (keyType === 'range') {
          const rangeKey = this.getRangeKey(key);
          const rangeType = this.getRangeType(key);

          if (rangeKey) {
            rangeFilters[rangeKey] = rangeFilters[rangeKey] || {};
            if (rangeType === 'min') {
              rangeFilters[rangeKey].gte = value;
            } else {
              rangeFilters[rangeKey].lte = value;
            }
          }
        }
      }

      return rangeFilters;
    }

    return {};
  }

  /**
   * Coerce range filters
   * @param {*} filters
   * @returns
   */
  coerceRanges(filters: any) {
    const transformed: any = {};

    if (filters) {
      for (const key of Object.keys(filters)) {
        const value = filters[key];

        if (!!value && value.constructor === Object) {
          const keys = Object.keys(value);
          if (keys.includes('min') || keys.includes('max')) {
            if (value.min) {
              transformed[`${key}.min`] = value.min;
            }
            if (value.max) {
              transformed[`${key}.max`] = value.max;
            }
          } else {
            transformed[key] = this.coerceRanges(value);
          }
        } else {
          transformed[key] = value;
        }
      }

      return transformed;
    }

    return filters;
  }

  /**
   * Create the search query
   */
  buildSearchQuery(filters = this.filters) {
    this.body = esb.requestBodySearch();
    const query = esb.boolQuery();

    if (filters) {
      const safeFilters = this.coerceRanges(filters);
      // remove any ranges to process separately
      const rangeFilters = this.extractRangeFilters(safeFilters);

      // handle non-range attributes
      const keys = Object.keys(safeFilters);
      for (const key of keys) {
        if (!this.isKeyBlacklisted(key)) {
          const value = safeFilters[key];
          const keyType = this.getKeyType(key, value);

          switch (keyType) {
            case 'ids':
              query.filter(esb.termsQuery('_id', value));
              break;
            case 'array':
              query.filter(esb.termsQuery(key, value));
              break;
            case 'range':
              // processed separately
              break;
            default:
              query.filter(esb.matchQuery(key, value));
              break;
          }
        }
      }

      // support the range filters
      const rangeKeys = Object.keys(rangeFilters);
      if (Array.isArray(rangeKeys) && rangeKeys.length) {
        for (const rangeKey of rangeKeys) {
          if (rangeFilters[rangeKey].gte) {
            query.filter(
              esb.rangeQuery(rangeKey).gte(rangeFilters[rangeKey].gte),
            );
          }
          if (rangeFilters[rangeKey].lte) {
            query.filter(
              esb.rangeQuery(rangeKey).lte(rangeFilters[rangeKey].lte),
            );
          }
        }
      }
    }

    // support search sort
    if (this.sort) {
      this.body.sort(esb.sort(this.sort, this.order));
    }

    // apply free text search
    if (this.q) {
      query.must(
        esb
          .boolQuery()
          .should(esb.matchQuery('copied', this.q))
          .should(esb.matchQuery('copied_ngrams', this.q)),
      );
    }

    // paginate
    this.paginate();

    // apply completion suggester
    if (this.suggest) {
      const { name, field, prefix, contexts } = this.suggest;
      const suggest = esb
        .completionSuggester(name, field)
        .prefix(prefix)
        .size(this.size);

      if (contexts) {
        Object.keys(contexts).forEach((key) => {
          suggest.contexts(key, contexts[key]);
        });
      }

      this.body.suggest(suggest);
    } else {
      this.body.query(query);
    }

    if (this.source && Array.isArray(this.source)) {
      this.body.source(this.source);
    }

    if (this.highlight && this.highlight.fields) {
      const fields: Array<string> = Object.keys(this.highlight.fields);
      const highlight = esb.highlight().fields(fields);
      fields.forEach((field: string) => {
        highlight
          .preTags(this.highlight.fields[field].pre_tags, field)
          .postTags(this.highlight.fields[field].post_tags, field);
      });
      this.body.highlight(highlight);
    }

    // query built no need to build it again
    this.dirty = false;
  }

  /**
   * Return the json query
   */
  toJSON() {
    if (this.dirty) {
      this.buildSearchQuery();
    }

    return this.body.toJSON();
  }
}

export default SearchQuery;
