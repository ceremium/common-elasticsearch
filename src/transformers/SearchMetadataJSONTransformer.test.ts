import SearchMetadataJSONTransformer from './SearchMetadataJSONTransformer';
import results from './__fixtures__/results';

describe('SearchMetadataJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform results into metadata', (done) => {
      const transformer = new SearchMetadataJSONTransformer();
      const result = transformer.transform(results.ranges);

      expect(result).toHaveProperty('speed', 0.32113);
      expect(result).toHaveProperty('maxRelevance', 1);

      done();
    });
  });
});
