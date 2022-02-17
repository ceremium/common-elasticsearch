import SearchQueryJSONTransformer from './SearchQueryJSONTransformer';
import SearchQuery from '../queries/SearchQuery';

describe('SearchQueryJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform a query', (done) => {
      const transformer = new SearchQueryJSONTransformer();
      const query = {
        'type.type': 'Incident affecting Patient',
        'type.category': 'Breach of 52 week pathway',
      };
      const result = transformer.transform(query);

      expect(result['type.type']).toBeTruthy();
      expect(result['type.category']).toBeTruthy();

      done();
    });

    it('should transform a query', (done) => {
      const transformer = new SearchQueryJSONTransformer();
      const query = {
        'type.type': 'Incident affecting Patient',
        'type.category': 'Breach of 52 week pathway',
        sort: 'type.type',
        order: 'asc',
      };
      const result = transformer.transform(query);

      expect(result['sort']).toBeUndefined();
      expect(result['order']).toBeUndefined();

      done();
    });
    it('should transform a SearchQuery', (done) => {
      const transformer = new SearchQueryJSONTransformer();
      const filters = {
        'type.type': 'Incident affecting Patient',
        'type.category': 'Breach of 52 week pathway',
        sort: 'type.type',
        order: 'asc',
      };
      const query = new SearchQuery(filters, 'person');

      const result = transformer.transform(query);

      expect(result['sort']).toBeUndefined();
      expect(result['order']).toBeUndefined();
      expect(result['type.type']).toBeTruthy();
      expect(result['type.category']).toBeTruthy();

      done();
    });
  });
});
