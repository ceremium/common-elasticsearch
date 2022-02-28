import SuggestionQuery from './SuggestionQuery';

describe('SuggestionQuery', () => {
  describe('#constructor', () => {
    describe('when valid', () => {
      it('should set field', () => {
        const query = new SuggestionQuery('title', 'arp');
        expect(query.field).toEqual('title');
      });
      it('should set query', () => {
        const query = new SuggestionQuery('title', 'arp');
        expect(query.query).toEqual('arp');
      });
      describe('when options are set', () => {
        it('should set options', () => {
          const query = new SuggestionQuery('title', 'arp', { fuzziness: 4 });
          expect(query.options).toBeTruthy();
          expect(query.options.fuzziness).toEqual(4);
        });
      });
      describe('when options are not set', () => {
        const query = new SuggestionQuery('title', 'arp');
        expect(query.options).toEqual({});
      });
    });
  });
  describe('#toJSON', () => {
    describe('when valid', () => {
      it('should generate a query', () => {
        const query = new SuggestionQuery('title', 'arp');
        const json = query.toJSON();
        expect(json).toEqual({
          suggest: {
            title: {
              completion: {
                field: 'title',
              },
              prefix: 'arp',
            },
          },
        });
      });
      describe('when fuzziness is set', () => {
        it('should include fuzziness', () => {
          const query = new SuggestionQuery('title', 'arp', { fuzziness: 4 });
          const json = query.toJSON();
          expect(json).toEqual({
            suggest: {
              title: {
                completion: {
                  field: 'title',
                  fuzzy: {
                    fuzziness: 4,
                  },
                },
                prefix: 'arp',
              },
            },
          });
        });
      });
      describe('when fields are set', () => {
        it('should include fields', () => {
          const query = new SuggestionQuery('title', 'arp', {
            fuzziness: 4,
            fields: ['title', 'description', 'image', 'url'],
          });
          const json = query.toJSON();
          expect(json).toEqual({
            _source: ['title', 'description', 'image', 'url'],
            suggest: {
              title: {
                completion: {
                  field: 'title',
                  fuzzy: {
                    fuzziness: 4,
                  },
                },
                prefix: 'arp',
              },
            },
          });
        });
      });
      describe('when size is set', () => {
        it('should include fields', () => {
          const query = new SuggestionQuery('title', 'arp', {
            size: 20,
          });
          const json = query.toJSON();
          expect(json).toEqual({
            suggest: {
              title: {
                completion: {
                  field: 'title',
                  size: 20,
                },
                prefix: 'arp',
              },
            },
          });
        });
      });
    });
  });
});
