import HitsJSONTransformer from './HitsJSONTransformer';
import Results from './__fixtures__/Results';

describe('HitsJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform results into hits', (done) => {
      const transformer = new HitsJSONTransformer();
      const result = transformer.transform(Results.ranges);

      expect(result.length).toEqual(1);

      done();
    });
  });
});
