import SuggestionJSONTransformer from './SuggestionJSONTransformer';
import Suggestions from './__fixtures__/Suggestions';

describe('SuggestionJSONTransformer', () => {
  describe('#transform', () => {
    let json = null;
    beforeEach(() => {
      const transformer = new SuggestionJSONTransformer();
      json = transformer.transform(Suggestions.valid.suggestions);
    });
    it('should return results', () => {
      expect(json.length).toEqual(4);
    });
    it('should return results attributes', () => {
      for (const result of json) {
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('description');
        expect(result).toHaveProperty('url');
        expect(result).toHaveProperty('image');
      }
    });
  });
});
