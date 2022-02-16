/**
 * Wrap a standard query and remove any
 * pagination information to create a valid
 * query for _count endpoint
 */
class CountSearchQuery {
  searchQuery: any;
  constructor(searchQuery: any) {
    this.searchQuery = searchQuery;
  }

  toJSON() {
    const json = this.searchQuery.toJSON();
    delete json.from;
    delete json.size;
    delete json.sort;

    return json;
  }
}

export default CountSearchQuery;
