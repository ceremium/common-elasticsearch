import SearchQuery from './SearchQuery';

describe('SearchQuery', () => {
  describe('#constructor', () => {
    it('should initialise filters', () => {
      const filters = { firstname: 'Mark' };
      const query = new SearchQuery(filters);
      expect(Object.keys(query.filters).includes('firstname')).toEqual(true);
    });
  });
  describe('#setPage', () => {
    it('should set page', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setPage(2);
      expect(query.page).toEqual(2);
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setPage(2);
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#setSort', () => {
    it('should set sort', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSort('created');
      expect(query.sort).toEqual('created');
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSort('created');
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#setOrder', () => {
    it('should set order', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setOrder('desc');
      expect(query.order).toEqual('desc');
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setOrder('desc');
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#setQ', () => {
    it('should set q', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setQ('Amox');
      expect(query.q).toEqual('Amox');
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setQ('Amox');
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#setSuggest', () => {
    it('should set suggest', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSuggest({ name: 'dmd', field: 'nm_suggest', prefix: 'Hum' });
      expect(query.suggest).toEqual({
        name: 'dmd',
        field: 'nm_suggest',
        prefix: 'Hum',
      });
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSuggest({ name: 'dmd', field: 'nm_suggest', prefix: 'Hum' });
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#setSize', () => {
    it('should set size', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSize(20);
      expect(query.size).toEqual(20);
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSize(2);
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#setFilters', () => {
    it('should set size', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setFilters({ month: 'January' });
      expect(query.filters).toEqual({ month: 'January' });
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setFilters({ month: 'January' });
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#setSource', () => {
    it('should set source', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSource(['firstname', 'lastname']);
      expect(query.source).toEqual(['firstname', 'lastname']);
    });
    it('should set dirty to true', () => {
      const filters = {};
      const query = new SearchQuery(filters);
      query.setSource(['firstname', 'lastname']);
      expect(query.dirty).toEqual(true);
    });
  });
  describe('#isKeyBlacklisted', () => {
    describe('when key is empty', () => {
      it('should return false', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const blacklisted = query.isKeyBlacklisted();
        expect(blacklisted).toEqual(false);
      });
    });
    describe('when key is null', () => {
      it('should return false', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const blacklisted = query.isKeyBlacklisted(null);
        expect(blacklisted).toEqual(false);
      });
    });
    describe('when key is not in the blacklist', () => {
      it('should return false', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const blacklisted = query.isKeyBlacklisted('created');
        expect(blacklisted).toEqual(false);
      });
    });
    describe('when key is in the blacklist', () => {
      it('should return false', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const blacklisted = query.isKeyBlacklisted('per');
        expect(blacklisted).toEqual(true);
      });
    });
  });
  describe('#getKeyType', () => {
    describe('when key is empty', () => {
      it('should return simple', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const type = query.getKeyType();
        expect(type).toEqual('simple');
      });
    });
    describe('when key is null', () => {
      it('should return simple', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const type = query.getKeyType(null, null);
        expect(type).toEqual('simple');
      });
    });
    describe('when key is an id', () => {
      it("should return 'ids'", () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const type = query.getKeyType('ids', ['1', '2', '3']);
        expect(type).toEqual('ids');
      });
    });
    describe('when value is an array', () => {
      it("should return 'array'", () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const type = query.getKeyType('months', ['January', 'February']);
        expect(type).toEqual('array');
      });
    });
    describe('when key contains min', () => {
      it("should return 'range'", () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const type = query.getKeyType('created.min', '20200303');
        expect(type).toEqual('range');
      });
    });
    describe('when key contains max', () => {
      it("should return 'range'", () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const type = query.getKeyType('created.max', '20200303');
        expect(type).toEqual('range');
      });
    });
    describe('when key is normal', () => {
      it("should return 'simple'", () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const type = query.getKeyType('height', 188);
        expect(type).toEqual('simple');
      });
    });
  });
  describe('#getRangeKey', () => {
    describe('when key is empty', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeKey();
        expect(key).toEqual(null);
      });
    });
    describe('when key is null', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeKey(null);
        expect(key).toEqual(null);
      });
    });
    describe('when key contains a single .', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeKey('created.min');
        expect(key).toEqual('created');
      });
    });
    describe('when key contains multiple .', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeKey('created.date.min');
        expect(key).toEqual('created.date');
      });
    });
  });
  describe('#getRangeType', () => {
    describe('when key is empty', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeType();
        expect(key).toEqual(null);
      });
    });
    describe('when key is null', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeType(null);
        expect(key).toEqual(null);
      });
    });
    describe('when key is not a range query', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeType('created');
        expect(key).toEqual(null);
      });
    });
    describe('when key is not min or max', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeType('created.other');
        expect(key).toEqual(null);
      });
    });
    describe('when key is min', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeType('created.min');
        expect(key).toEqual('min');
      });
    });
    describe('when key is max', () => {
      it('should return null', () => {
        const filters = {};
        const query = new SearchQuery(filters);
        const key = query.getRangeType('created.max');
        expect(key).toEqual('max');
      });
    });
  });
  describe('#buildSearchQuery', () => {
    describe('when no attributes are passed', () => {
      let json = null;
      beforeEach((done) => {
        const filters = {};
        const query = new SearchQuery(filters);
        json = query.toJSON();
        done();
      });
      it('should return an empty query', () => {
        expect(json).toHaveProperty('query');
        expect(json.query).toHaveProperty('bool');
      });
      it('should use default pagination', () => {
        expect(json.from).toEqual(0);
        expect(json.size).toEqual(10);
      });
    });

    describe('when paginating', () => {
      describe('when overriding page', () => {
        it('should set from', () => {
          const filters = { per: 20, page: 2 };
          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json.from).toEqual(20);
        });
      });
      describe('when overriding results per page', () => {
        it('should set size', () => {
          const filters = { per: 20, page: 2 };
          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json.size).toEqual(20);
        });
      });
    });

    describe('when using ranges', () => {
      it('should set apply the min and max ranges', () => {
        const filters = { created: { min: '2021-01-01', max: '2021-12-31' } };
        const query = new SearchQuery(filters);
        const json = query.toJSON();

        const {
          query: {
            bool: { filter: ranges },
          },
        } = json;

        expect(Array.isArray(ranges)).toBe(true);
        expect(ranges.length).toEqual(2);

        const lteRange = ranges.find(
          (item) => (item.range['lte'] = '2021-12-31'),
        );
        const gteRange = ranges.find(
          (item) => (item.range['gte'] = '2021-01-01'),
        );

        expect(lteRange).toBeTruthy();
        expect(gteRange).toBeTruthy();
      });
    });

    describe('when searching with freetext', () => {
      describe('when not using a wildcard', () => {
        it('should create a free text search against copied and copied_ngrams', () => {
          const filters = { q: 'Female' };
          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('must');
          expect(json.query.bool.must).toHaveProperty('bool');
          expect(json.query.bool.must.bool).toHaveProperty('should');

          expect(json.query.bool.must.bool.should.length).toEqual(2);

          json.query.bool.must.bool.should.forEach((s) => {
            const m = s.match;
            Object.keys(m).forEach((attribute) => {
              switch (attribute) {
                case 'copied':
                  expect(m[attribute]).toEqual('Female');
                  break;
                case 'copied_ngrams':
                  expect(m[attribute]).toEqual('Female');
                  break;
              }
            });
          });
        });
      });
      describe('when not using a search fields', () => {
        it('should create a free text search against the search fields', () => {
          const filters = { q: 'artificial intelligence' };
          const query = new SearchQuery(filters);
          const searchFields = [
            {
              name: 'body',
            },
            {
              name: 'body.phrased',
              boost: 5,
            },
            {
              name: 'title',
              boost: 2,
            },
            {
              name: 'title.phrased',
              boost: 10,
            },
          ];
          query.setFilterFields(searchFields);
          const json = query.toJSON();

          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('must');
          expect(json.query.bool.must).toHaveProperty('bool');
          expect(json.query.bool.must.bool).toHaveProperty('should');

          expect(json.query.bool.must.bool.should.length).toEqual(4);

          json.query.bool.must.bool.should.forEach((s) => {
            const m = s.match;
            const mp = s.match_phrase;
            if (m) {
              Object.keys(m).forEach((attribute) => {
                switch (attribute) {
                  case 'body':
                    expect(m[attribute].query).toEqual(
                      'artificial intelligence',
                    );
                    expect(m[attribute].boost).toBeUndefined();
                    break;
                  case 'title':
                    expect(m[attribute].query).toEqual(
                      'artificial intelligence',
                    );
                    expect(m[attribute].boost).toEqual(2);
                    break;
                }
              });
            }

            if (mp) {
              Object.keys(mp).forEach((attribute) => {
                switch (attribute) {
                  case 'body.phrased':
                    expect(mp[attribute].query).toEqual(
                      'artificial intelligence',
                    );
                    expect(mp[attribute].boost).toEqual(5);
                    break;
                  case 'title.phrased':
                    expect(mp[attribute].query).toEqual(
                      'artificial intelligence',
                    );
                    expect(mp[attribute].boost).toEqual(10);
                    break;
                }
              });
            }
          });
        });
      });
    });

    describe('when using filters', () => {
      describe('when using a single filter', () => {
        it('should apply the filter', () => {
          const filters = { 'metadata.patient.smoker': 'Yes' };
          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json).toHaveProperty('query', {
            bool: {
              filter: {
                match: {
                  'metadata.patient.smoker': 'Yes',
                },
              },
            },
          });
        });
      });
      describe('when using multiple filters', () => {
        it('should apply the filters', () => {
          const filters = {
            'metadata.patient.smoker': 'Yes',
            'metadata.patient.homeless': 'Yes',
          };

          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json).toHaveProperty('from', 0);
          expect(json).toHaveProperty('size', 10);
          expect(json).toHaveProperty('query', {
            bool: {
              filter: [
                {
                  match: {
                    'metadata.patient.smoker': 'Yes',
                  },
                },
                {
                  match: {
                    'metadata.patient.homeless': 'Yes',
                  },
                },
              ],
            },
          });
        });
      });
      describe('when using ranges', () => {
        it('should create boolean filters', (done) => {
          const filters = {
            'when.min': '2018-06-04',
            'when.max': '2020-06-04',
          };
          const query = new SearchQuery(filters);
          const json = query.toJSON();
          expect(typeof json).toEqual('object');

          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');
          expect(json.query.bool.filter.length).toEqual(2);

          done();
        });
        describe('when using date ranges', () => {
          const ranges: any = {};
          beforeEach((done) => {
            const body = { 'when.min': '2018-06-04', 'when.max': '2020-06-04' };
            const query = new SearchQuery(body);
            const json = query.toJSON();
            const filters = json.query.bool.filter;

            filters.forEach((filter) => {
              const when = filter.range.when;
              Object.keys(when).forEach((operation) => {
                ranges[operation] = when[operation];
              });
            });

            done();
          });
          it('should add an lte filter', (done) => {
            expect(ranges.lte).toEqual('2020-06-04');

            done();
          });
          it('should add a gt filter', (done) => {
            expect(ranges.gte).toEqual('2018-06-04');

            done();
          });
        });
        describe('when using number ranges', () => {
          const ranges: any = {};
          beforeEach((done) => {
            const body = { 'age.min': 18, 'age.max': 24 };
            const query = new SearchQuery(body);
            const json = query.toJSON();
            const filters = json.query.bool.filter;

            filters.forEach((filter) => {
              const age = filter.range.age;
              Object.keys(age).forEach((operation) => {
                ranges[operation] = age[operation];
              });
            });

            done();
          });
          it('should add an lt filter', (done) => {
            expect(ranges.lte).toEqual(24);

            done();
          });
          it('should add a gte filter', (done) => {
            expect(ranges.gte).toEqual(18);

            done();
          });
        });
        describe('when using ranges with min only', () => {
          const ranges: any = {};
          beforeEach((done) => {
            const body = { 'when.min': '2018-06-04' };
            const query = new SearchQuery(body);
            const json = query.toJSON();
            const filter = json.query.bool.filter;

            const when = filter.range.when;
            Object.keys(when).forEach((operation) => {
              ranges[operation] = when[operation];
            });

            done();
          });
          it('should only add one filter', (done) => {
            expect(Object.keys(ranges).length).toEqual(1);
            done();
          });
          it('should not add an lt filter', (done) => {
            expect(ranges.lte).toBeUndefined();
            done();
          });
          it('should add a gte filter', (done) => {
            expect(ranges.gte).toEqual('2018-06-04');

            done();
          });
        });
        describe('when using ranges with max only', () => {
          const ranges: any = {};
          beforeEach((done) => {
            const body = { 'age.max': 24 };
            const query = new SearchQuery(body);
            const json = query.toJSON();
            const filter = json.query.bool.filter;

            const age = filter.range.age;
            Object.keys(age).forEach((operation) => {
              ranges[operation] = age[operation];
            });

            done();
          });
          it('should only add one filter', (done) => {
            expect(Object.keys(ranges).length).toEqual(1);
            done();
          });
          it('should add an lte filter', (done) => {
            expect(ranges.lte).toEqual(24);
            done();
          });
          it('should not add a gte filter', (done) => {
            expect(ranges.gte).toBeUndefined();

            done();
          });
        });
      });
    });

    describe('when using compound searches', () => {
      describe('single filter and tree text', () => {
        let json = null;
        beforeEach((done) => {
          const filters = { q: 'Female', 'metadata.patient.smoker': 'Yes' };
          const query = new SearchQuery(filters);
          json = query.toJSON();

          done();
        });
        it('should set from', () => {
          expect(json).toHaveProperty('from', 0);
        });
        it('should set size', () => {
          expect(json).toHaveProperty('size', 10);
        });
        it('should add a filter', () => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');
          expect(json.query.bool.filter).toHaveProperty('match');

          expect(Object.keys(json.query.bool.filter.match).length).toEqual(1);
          expect(
            json.query.bool.filter.match['metadata.patient.smoker'],
          ).toEqual('Yes');
        });
        it('should add a freetext query', (done) => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('must');
          expect(json.query.bool.must).toHaveProperty('bool');
          expect(json.query.bool.must.bool).toHaveProperty('should');

          expect(json.query.bool.must.bool.should.length).toEqual(2);
          const should = json.query.bool.must.bool.should;
          should.forEach((entry) => {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            if (match.copied) {
              expect(match.copied).toEqual('Female');
            } else if (match.copied_ngrams) {
              expect(match.copied_ngrams).toEqual('Female');
            } else {
              done.fail('Unable to find copied or copied_ngrams');
            }
          });
          done();
        });
      });
      describe('single filter matching array of options', () => {
        let json = null;
        beforeEach((done) => {
          const filters = {
            'metadata.sample.isolateId': ['123', '456'],
          };
          const query = new SearchQuery(filters);
          json = query.toJSON();
          done();
        });
        it('should set from', () => {
          expect(json).toHaveProperty('from', 0);
        });
        it('should set size', () => {
          expect(json).toHaveProperty('size', 10);
        });
        it('should support and query', () => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');
          expect(Array.isArray(json.query.bool.filter)).toBe(true);

          const matches = json.query.bool.filter;
          expect(matches.length).toEqual(2);
          matches.forEach((entry) => {
            expect(
              ['123', '456'].includes(entry.match['metadata.sample.isolateId']),
            ).toEqual(true);
          });
        });
      });
      describe('multiple filters and tree text', () => {
        let json = null;
        beforeEach((done) => {
          const filters = {
            q: 'Female',
            'metadata.patient.smoker': 'Yes',
            'metadata.patient.homeless': 'No',
          };
          const query = new SearchQuery(filters);
          json = query.toJSON();
          done();
        });
        it('should set from', () => {
          expect(json).toHaveProperty('from', 0);
        });
        it('should set size', () => {
          expect(json).toHaveProperty('size', 10);
        });
        it('should set filters', (done) => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');

          const filter = json.query.bool.filter;
          expect(filter.length).toEqual(2);
          filter.forEach((entry) => {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            Object.keys(match).forEach((key) => {
              if (key === 'metadata.patient.smoker') {
                expect(match[key]).toEqual('Yes');
              } else if (key === 'metadata.patient.homeless') {
                expect(match[key]).toEqual('No');
              } else {
                done.fail(`${key} is not an expected filter`);
              }
            });
          });
          done();
        });
        it('should add a freetext query', (done) => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('must');
          expect(json.query.bool.must).toHaveProperty('bool');
          expect(json.query.bool.must.bool).toHaveProperty('should');

          expect(json.query.bool.must.bool.should.length).toEqual(2);
          const should = json.query.bool.must.bool.should;
          should.forEach((entry) => {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            if (match.copied) {
              expect(match.copied).toEqual('Female');
            } else if (match.copied_ngrams) {
              expect(match.copied_ngrams).toEqual('Female');
            } else {
              done.fail('Unable to find copied or copied_ngrams');
            }
          });
          done();
        });
      });
      describe('multiple filters, tree text and sort', () => {
        let json = null;
        beforeEach((done) => {
          const filters = {
            q: 'Female',
            'metadata.patient.smoker': 'Yes',
            'metadata.patient.homeless': 'No',
            sort: 'metadata.patient.smoker',
            order: 'asc',
          };
          const query = new SearchQuery(filters);
          json = query.toJSON();
          done();
        });
        it('should set from', () => {
          expect(json).toHaveProperty('from', 0);
        });
        it('should set size', () => {
          expect(json).toHaveProperty('size', 10);
        });
        it('should set sort', () => {
          expect(json).toHaveProperty('sort');
          const sort = json.sort;
          const primarySort = sort.pop();

          expect(
            Object.keys(primarySort).includes('metadata.patient.smoker'),
          ).toEqual(true);
        });
        it('should set order', () => {
          expect(json).toHaveProperty('sort');
          const sort = json.sort;
          const primarySort = sort.pop();

          expect(primarySort['metadata.patient.smoker']).toEqual('asc');
        });
        it('should set filters', (done) => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');

          const filter = json.query.bool.filter;
          expect(filter.length).toEqual(2);
          filter.forEach((entry) => {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            Object.keys(match).forEach((key) => {
              if (key === 'metadata.patient.smoker') {
                expect(match[key]).toEqual('Yes');
              } else if (key === 'metadata.patient.homeless') {
                expect(match[key]).toEqual('No');
              } else {
                done.fail(`${key} is not an expected filter`);
              }
            });
          });
          done();
        });
        it('should add a freetext query', (done) => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('must');
          expect(json.query.bool.must).toHaveProperty('bool');
          expect(json.query.bool.must.bool).toHaveProperty('should');

          expect(json.query.bool.must.bool.should.length).toEqual(2);
          const should = json.query.bool.must.bool.should;
          should.forEach((entry) => {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            if (match.copied) {
              expect(match.copied).toEqual('Female');
            } else if (match.copied_ngrams) {
              expect(match.copied_ngrams).toEqual('Female');
            } else {
              done.fail('Unable to find copied or copied_ngrams');
            }
          });
          done();
        });
      });
      describe('multiple filters and ids', () => {
        let json = null;
        beforeEach((done) => {
          const filters = {
            'metadata.patient.smoker': 'Yes',
            'metadata.patient.homeless': 'No',
            ids: ['123', '456'],
          };
          const query = new SearchQuery(filters);
          json = query.toJSON();

          done();
        });
        it('should set from', () => {
          expect(json).toHaveProperty('from', 0);
        });
        it('should set size', () => {
          expect(json).toHaveProperty('size', 10);
        });
        it('should set filters', (done) => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');

          const filter = json.query.bool.filter;
          expect(filter.length).toEqual(3);

          const matches = filter.filter((entry) =>
            Object.keys(entry).includes('match'),
          );
          expect(matches.length).toEqual(2);
          matches.forEach((entry) => {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            Object.keys(match).forEach((key) => {
              if (key === 'metadata.patient.smoker') {
                expect(match[key]).toEqual('Yes');
              } else if (key === 'metadata.patient.homeless') {
                expect(match[key]).toEqual('No');
              } else {
                done.fail(`${key} is not an expected filter`);
              }
            });
          });
          done();
        });
        it('should set term matches for ids', () => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');

          const filter = json.query.bool.filter;
          expect(filter.length).toEqual(3);

          const terms = filter.filter((entry) =>
            Object.keys(entry).includes('terms'),
          );
          const term = terms[0];
          expect(term).toHaveProperty('terms');

          expect(term.terms['_id'].length).toEqual(2);
          term.terms['_id'].forEach((id) => {
            expect(['123', '456'].includes(id)).toEqual(true);
          });
        });
      });

      describe('multiple filters with array of options', () => {
        let json = null;
        beforeEach((done) => {
          const filters = {
            'metadata.patient.smoker': 'Yes',
            'metadata.patient.homeless': 'No',
            'metadata.sample.isolateId': ['123', '456'],
          };
          const query = new SearchQuery(filters);
          json = query.toJSON();
          done();
        });
        it('should set from', () => {
          expect(json).toHaveProperty('from', 0);
        });
        it('should set size', () => {
          expect(json).toHaveProperty('size', 10);
        });
        it('should set filters', (done) => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');

          const filter = json.query.bool.filter;
          expect(filter.length).toEqual(4);

          const matches = filter.filter((entry) =>
            Object.keys(entry).includes('match'),
          );
          expect(matches.length).toEqual(4);

          for (const entry of matches) {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            Object.keys(match).forEach((key) => {
              if (key === 'metadata.patient.smoker') {
                expect(match[key]).toEqual('Yes');
              } else if (key === 'metadata.patient.homeless') {
                expect(match[key]).toEqual('No');
              } else if (key === 'metadata.sample.isolateId') {
                expect(['123', '456'].includes(match[key])).toEqual(true);
              } else {
                done.fail(`${key} is not an expected filter`);
              }
            });
          }
          done();
        });
        it('should set filters for arrays', () => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');

          const filter = json.query.bool.filter;
          expect(filter.length).toEqual(4);

          const matches = filter.filter((entry) =>
            Object.keys(entry).includes('match'),
          );

          expect(matches.length).toEqual(4);

          for (const entry of matches) {
            expect(entry).toHaveProperty('match');
            const match = entry.match['metadata.sample.isolateId'];
            if (match) {
              expect(['123', '456'].includes(match)).toEqual(true);
            }
          }
        });
      });
    });

    describe('when sorting results', () => {
      it('should apply the sort', () => {
        const filters = {
          sort: 'metadata.patient.smoker',
          order: 'asc',
        };
        const query = new SearchQuery(filters);
        const json = query.toJSON();

        expect(json).toHaveProperty('from', 0);
        expect(json).toHaveProperty('size', 10);

        expect(json).toHaveProperty('sort');
        const sort = json.sort;
        const primarySort = sort.pop();
        expect(primarySort).toEqual({
          'metadata.patient.smoker': 'asc',
        });
        expect(Array.isArray(sort)).toEqual(true);
      });
      describe('when using a whitelist', () => {
        describe('when sort attributes are in the whitelist', () => {
          it('should apply a whitelisted sort', () => {
            const filters = {
              sort: 'metadata.patient.smoker',
              order: 'asc',
              whitelist: ['metadata.patient.smoker'],
            };
            const query = new SearchQuery(filters);
            const json = query.toJSON();

            expect(json).toHaveProperty('from', 0);
            expect(json).toHaveProperty('size', 10);

            expect(json).toHaveProperty('sort');
            const sort = json.sort;
            const primarySort = sort.pop();
            expect(primarySort).toEqual({
              'metadata.patient.smoker': 'asc',
            });
            expect(Array.isArray(sort)).toEqual(true);
          });
        });
        describe('when sort attributes are not in the whitelist', () => {
          it('should ignore sorts not on a whitelist', () => {
            const filters = {
              sort: 'metadata.patient.smoker',
              order: 'asc',
              whitelist: ['metadata.patient.homeless'],
            };
            const query = new SearchQuery(filters);
            const json = query.toJSON();

            expect(json).toHaveProperty('from', 0);
            expect(json).toHaveProperty('size', 10);

            expect(json).toHaveProperty('sort');

            const sorts = json.sort;

            const homeless = sorts.find(
              (item) =>
                Object.keys(item).indexOf('metadata.patient.homeless') > -1,
            );

            expect(homeless).toBeUndefined();
          });
        });
      });
    });

    describe('when using suggester', () => {
      describe('when no contexts passed', () => {
        it('should create completion suggester query', () => {
          const filters = {
            suggest: { name: 'people', field: 'gender', prefix: 'Fem' },
          };
          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json).toHaveProperty('suggest');
          expect(json.suggest).toHaveProperty('people');
          expect(json.suggest.people).toHaveProperty('completion');
          expect(json.suggest.people).toHaveProperty('prefix', 'Fem');
          expect(json.suggest.people.completion).toHaveProperty(
            'field',
            'gender',
          );
          expect(json.suggest.people.completion).toHaveProperty('size', 10);
        });
      });

      describe('when using contexts', () => {
        it('should create completion suggester query with contexts', () => {
          const filters = {
            suggest: {
              name: 'people',
              field: 'gender',
              prefix: 'Fem',
              contexts: {
                country: ['France'],
              },
            },
          };
          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json).toHaveProperty('suggest');
          expect(json.suggest).toHaveProperty('people');
          expect(json.suggest.people).toHaveProperty('completion');
          expect(json.suggest.people.completion).toHaveProperty('contexts', {
            country: ['France'],
          });
        });
      });

      describe('when using source', () => {
        it('should create a searcg query with source', () => {
          const filters = {
            source: ['firstname', 'lastname'],
          };
          const query = new SearchQuery(filters);
          const json = query.toJSON();

          expect(json['_source'].length).toEqual(2);
          expect(json).toHaveProperty('_source', ['firstname', 'lastname']);
        });
      });
    });

    it('should support ids query', () => {
      const filters = { ids: ['123', '456'] };
      const query = new SearchQuery(filters);
      const json = query.toJSON();

      expect(json).toHaveProperty('from', 0);
      expect(json).toHaveProperty('size', 10);
      expect(json).toHaveProperty('query', {
        bool: {
          filter: {
            terms: {
              _id: ['123', '456'],
            },
          },
        },
      });
    });

    it('should set type to the documents type', () => {
      const filters = { ids: ['234', '455'] };
      const query = new SearchQuery(filters);
      const json = query.toJSON();

      expect(json).toHaveProperty('from', 0);
      expect(json).toHaveProperty('size', 10);
      expect(json).toHaveProperty('query', {
        bool: {
          filter: {
            terms: {
              _id: ['234', '455'],
            },
          },
        },
      });
    });

    it('should support highlight', () => {
      const highlight = {
        fields: {
          'title.phrased': {
            pre_tags: ['<strong>'],
            post_tags: ['</strong>'],
          },
          'body.phrased': {
            pre_tags: ['<strong>'],
            post_tags: ['</strong>'],
          },
        },
      };
      const query = new SearchQuery({});
      query.setHighlight(highlight);
      const json = query.toJSON();

      expect(json).toHaveProperty('from', 0);
      expect(json).toHaveProperty('size', 10);
      expect(json).toHaveProperty('highlight', {
        fields: {
          'title.phrased': { pre_tags: ['<strong>'], post_tags: ['</strong>'] },
          'body.phrased': { pre_tags: ['<strong>'], post_tags: ['</strong>'] },
        },
      });
    });
  });
});
