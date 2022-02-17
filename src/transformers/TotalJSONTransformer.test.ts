import TotalJSONTransformer from './TotalJSONTransformer';
import results from './__fixtures__/results';

describe('TotalJSONTransformer', () => {
  describe('#transform', () => {
    describe('when ES version is less than 7', () => {
      it('should transform results into hits', (done) => {
        const transformer = new TotalJSONTransformer();
        const result = transformer.transform(results.ranges);

        expect(result.total).toEqual(5);
        expect(result.totalRelation).toEqual('');

        done();
      });
    });
    describe('when ES version is 7', () => {
      it('should transform results into hits', (done) => {
        const transformer = new TotalJSONTransformer();
        const result = transformer.transform(results.rangesV7);

        expect(result.total).toEqual(5);
        expect(result.totalRelation).toEqual('eq');

        done();
      });
      it('should transform results with value 0', (done) => {
        const transformer = new TotalJSONTransformer();
        const result = transformer.transform(results.results0);

        expect(result.total).toEqual(0);
        expect(result.totalRelation).toEqual('eq');

        done();
      });
    });
  });
});
