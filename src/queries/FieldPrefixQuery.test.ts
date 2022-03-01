import FieldPrefixQuery from './FieldPrefixQuery';

describe('FieldPrefixQuery', () => {
  describe('#constructor', () => {
    describe('when valid', () => {
      it('should set field', () => {
        const query = new FieldPrefixQuery('title', 'arp');
        expect(query.field).toEqual('title');
      });
      it('should set query', () => {
        const query = new FieldPrefixQuery('title', 'arp');
        expect(query.query).toEqual('arp');
      });
      describe('when options are set', () => {
        it('should set options', () => {
          const query = new FieldPrefixQuery('title', 'arp', { size: 20 });
          expect(query.options).toBeTruthy();
          expect(query.options.size).toEqual(20);
        });
      });
      describe('when options are not set', () => {
        const query = new FieldPrefixQuery('title', 'arp');
        expect(query.options).toEqual({});
      });
    });
  });
  describe('#toJSON', () => {
    describe('when valid', () => {
      it('should generate a query', () => {
        const query = new FieldPrefixQuery('title', 'arp');
        const json = query.toJSON();

        expect(json).toEqual({
          query: {
            prefix: {
              title: 'arp',
            },
          },
          sort: [
            {
              _score: 'desc',
            },
          ],
          highlight: {
            fields: {
              title: {
                pre_tags: ['<strong>'],
                post_tags: ['</strong>'],
              },
            },
          },
        });
      });
      describe('when fields are set', () => {
        it('should include fields', () => {
          const query = new FieldPrefixQuery('title', 'arp', {
            fields: ['title', 'description', 'image', 'url'],
          });
          const json = query.toJSON();
          expect(json).toEqual({
            query: {
              prefix: {
                title: 'arp',
              },
            },
            sort: [
              {
                _score: 'desc',
              },
            ],
            highlight: {
              fields: {
                title: {
                  pre_tags: ['<strong>'],
                  post_tags: ['</strong>'],
                },
              },
            },
            _source: ['title', 'description', 'image', 'url'],
          });
        });
      });
      describe('when size is set', () => {
        it('should include fields', () => {
          const query = new FieldPrefixQuery('title', 'arp', {
            size: 20,
          });
          const json = query.toJSON();
          expect(json).toEqual({
            query: {
              prefix: {
                title: 'arp',
              },
            },
            sort: [
              {
                _score: 'desc',
              },
            ],
            highlight: {
              fields: {
                title: {
                  pre_tags: ['<strong>'],
                  post_tags: ['</strong>'],
                },
              },
            },
            size: 20,
          });
        });
      });
    });
  });
});
