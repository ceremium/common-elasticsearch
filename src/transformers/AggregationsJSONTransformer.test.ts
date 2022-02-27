import AggregationsJSONTransformer from './AggregationsJSONTransformer';
import results from './__fixtures__/Results';

describe('AggregationsJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform results into aggregations', (done) => {
      const transformer = new AggregationsJSONTransformer();
      const result = transformer.transform(results.ranges);

      expect(result['involved.type']).not.toBeUndefined();
      expect(result['involved.role']).not.toBeUndefined();

      expect(result['min_when.when']).not.toBeUndefined();
      expect(result['max_when.when']).not.toBeUndefined();

      expect(
        result['min_slipsTripsFallsAndCollisions.fallsLastYear'],
      ).not.toBeUndefined();
      expect(
        result['max_slipsTripsFallsAndCollisions.fallsLastYear'],
      ).not.toBeUndefined();

      done();
    });
  });
});
