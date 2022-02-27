import HitsJSONTransformer from './HitsJSONTransformer';
import results from './__fixtures__/Results';

describe('HitsJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform results into hits', (done) => {
      const transformer = new HitsJSONTransformer();
      const result = transformer.transform(results.ranges);

      expect(result.length).toEqual(1);

      done();
    });
  });
});
