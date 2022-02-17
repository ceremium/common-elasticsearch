import WildcardSearchQueryDecorator from './WildcardSearchQueryDecorator';

describe('WildcardSearchQueryDecorator', () => {
  describe('#decorate', () => {
    it('should wildcard search queries', (done) => {
      const query = {
        q: 'SAMD00017693',
      };
      const decorator = new WildcardSearchQueryDecorator();
      const decoratedQuery = decorator.decorate(query);
      expect(decoratedQuery).toHaveProperty('q', 'SAMD00017693*');
      done();
    });
  });
});
