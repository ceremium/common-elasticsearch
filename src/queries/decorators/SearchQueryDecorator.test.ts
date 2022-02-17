import SearchQueryDecorator from './SearchQueryDecorator';

describe('SearchQueryDecorator', () => {
  describe('#decorate', () => {
    it('should leave query untouched by default', (done) => {
      const query = {
        one: 'two',
        three: {
          four: 'five',
        },
      };
      const decorator = new SearchQueryDecorator();
      const decoratedQuery = decorator.decorate(query);
      expect(JSON.stringify(decoratedQuery)).toEqual(JSON.stringify(query));
      done();
    });
  });
});
