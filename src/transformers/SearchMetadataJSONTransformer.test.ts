import SearchMetadataJSONTransformer from './SearchMetadataJSONTransformer';
import Results from './__fixtures__/Results';

describe('SearchMetadataJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform results into metadata', (done) => {
      const transformer = new SearchMetadataJSONTransformer();
      const result = transformer.transform(Results.ranges);

      expect(result).toHaveProperty('speed', 0.32113);
      expect(result).toHaveProperty('maxRelevance', 1);

      done();
    });
  });
});
