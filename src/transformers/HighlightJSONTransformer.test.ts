import HighlightJSONTransformer from './HighlightJSONTransformer';
import Highlights from './__fixtures__/Highlights';

enum HIGHLIGHT_FIELDS_MAPPING {
  'title.phrased' = 'title',
  'body.phrased' = 'body',
  'description.phrased' = 'description',
}

describe('HighlightJSONTransformer', () => {
  describe('#transform', () => {
    describe('when highlights are present', () => {
      it('should transform replace the highlighted text', (done) => {
        const transformer = new HighlightJSONTransformer();
        const result = transformer.transform(
          Highlights.valid,
          HIGHLIGHT_FIELDS_MAPPING,
        );

        expect(result.title).toEqual(
          'Healthcare <strong>AI</strong> innovator Prognos finds frequent doses of new insight can benefit its customers',
        );

        done();
      });
    });
    describe('when no highlights are present', () => {
      it('should keep the original text', (done) => {
        const transformer = new HighlightJSONTransformer();
        const result = transformer.transform(
          Highlights.empty,
          HIGHLIGHT_FIELDS_MAPPING,
        );

        expect(result.title).toBeUndefined();

        done();
      });
    });
  });
});
