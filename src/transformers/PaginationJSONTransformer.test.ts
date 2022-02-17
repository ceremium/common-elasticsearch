import PaginationJSONTransformer from './PaginationJSONTransformer';
import results from './__fixtures__/results';

describe('PaginationJSONTransformer', () => {
  describe('#transform', () => {
    it('should transform results into a pagination summary', (done) => {
      const transformer = new PaginationJSONTransformer();
      const options = {
        per: 10,
        page: 1,
      };
      const result = transformer.transform(results.ranges, options);

      expect(result).toHaveProperty('per', 10);
      expect(result).toHaveProperty('page', 1);
      expect(result).toHaveProperty('previous', 1);
      expect(result).toHaveProperty('next', 1);
      expect(result).toHaveProperty('pages', 1);

      done();
    });
    it('should transform results and calculate pages', (done) => {
      const transformer = new PaginationJSONTransformer();
      const options = {
        per: 2,
        page: 1,
      };
      const result = transformer.transform(results.ranges, options);

      expect(result).toHaveProperty('per', 2);
      expect(result).toHaveProperty('page', 1);
      expect(result).toHaveProperty('previous', 1);
      expect(result).toHaveProperty('next', 2);
      expect(result).toHaveProperty('pages', 3);

      done();
    });
    it('should transform results and calculate next and previous', (done) => {
      const transformer = new PaginationJSONTransformer();
      const options = {
        per: 2,
        page: 2,
      };
      const result = transformer.transform(results.ranges, options);

      expect(result).toHaveProperty('per', 2);
      expect(result).toHaveProperty('page', 2);
      expect(result).toHaveProperty('previous', 1);
      expect(result).toHaveProperty('next', 3);
      expect(result).toHaveProperty('pages', 3);

      done();
    });
  });
});
