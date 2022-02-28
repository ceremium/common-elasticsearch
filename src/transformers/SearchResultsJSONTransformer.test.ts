import SearchResultsJSONTransformer from './SearchResultsJSONTransformer';
import Results from './__fixtures__/Results';

describe('SearchResultsJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform a query', (done) => {
      const transformer = new SearchResultsJSONTransformer();
      const result = transformer.transform(Results.ranges);

      expect(result).toHaveProperty('total', 5);
      expect(result).toHaveProperty('pagination');
      expect(result).toHaveProperty('metadata');

      expect(result.pagination).toHaveProperty('per', 10);
      expect(result.pagination).toHaveProperty('page', 1);
      expect(result.pagination).toHaveProperty('previous', 1);
      expect(result.pagination).toHaveProperty('next', 1);
      expect(result.pagination).toHaveProperty('pages', 1);

      expect(result.metadata).toHaveProperty('speed', 0.32113);
      expect(result.metadata).toHaveProperty('maxRelevance', 1);

      done();
    });
  });
});
