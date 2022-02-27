import TotalJSONTransformer from './TotalJSONTransformer';
import Results from './__fixtures__/Results';

describe('TotalJSONTransformer', () => {
  describe('#transform', () => {
    describe('when ES version is less than 7', () => {
      it('should transform results into hits', (done) => {
        const transformer = new TotalJSONTransformer();
        const result = transformer.transform(Results.ranges);

        expect(result.total).toEqual(5);
        expect(result.totalRelation).toEqual('');

        done();
      });
    });
    describe('when ES version is 7', () => {
      it('should transform results into hits', (done) => {
        const transformer = new TotalJSONTransformer();
        const result = transformer.transform(Results.rangesV7);

        expect(result.total).toEqual(5);
        expect(result.totalRelation).toEqual('eq');

        done();
      });
      it('should transform results with value 0', (done) => {
        const transformer = new TotalJSONTransformer();
        const result = transformer.transform(Results.results0);

        expect(result.total).toEqual(0);
        expect(result.totalRelation).toEqual('eq');

        done();
      });
    });
  });
});
