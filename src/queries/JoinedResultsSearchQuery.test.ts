import { doesNotMatch } from 'assert';
import JoinedResultsSearchQuery from './JoinedResultsSearchQuery';

describe('JoinedResultsSearchQuery', () => {
  describe('#buildSearchQuery', () => {
    describe('when using filters', () => {
      describe('single filter matching array of options', () => {
        let json = null;
        beforeEach((done) => {
          const filters = {
            'metadata.sample.isolateId': ['123', '456'],
          };
          const query = new JoinedResultsSearchQuery(filters);
          json = query.toJSON();
          done();
        });
        it('should set from', () => {
          expect(json).toHaveProperty('from', 0);
        });
        it('should set size', () => {
          expect(json).toHaveProperty('size', 10);
        });
        it('should support or query', () => {
          expect(json).toHaveProperty('query');
          expect(json.query).toHaveProperty('bool');
          expect(json.query.bool).toHaveProperty('filter');
          expect(json.query.bool.filter).toHaveProperty('bool');
          expect(json.query.bool.filter.bool).toHaveProperty('should');
          expect(Array.isArray(json.query.bool.filter.bool.should)).toBe(true);

          const matches = json.query.bool.filter.bool.should;
          expect(matches.length).toEqual(2);
          matches.forEach((entry) => {
            expect(
              ['123', '456'].includes(entry.match['metadata.sample.isolateId']),
            ).toEqual(true);
          });
        });
      });
    });
    describe('when using compound searches', () => {
      describe('multiple filters with array of options', () => {
        let json = null;
        beforeEach(() => {
          const filters = {
            'metadata.patient.smoker': 'Yes',
            'metadata.patient.homeless': 'No',
            'metadata.sample.isolateId': ['123', '456'],
          };
          const query = new JoinedResultsSearchQuery(filters);
          json = query.toJSON();
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
          const shoulds = filter.filter((entry) =>
            Object.keys(entry).includes('bool'),
          )[0].bool.should;
          expect(matches.length).toEqual(2);
          for (const entry of matches) {
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
          }

          for (const entry of shoulds) {
            expect(entry).toHaveProperty('match');
            const match = entry.match;
            Object.keys(match).forEach((key) => {
              if (key === 'metadata.sample.isolateId') {
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
          expect(filter.length).toEqual(3);

          const shoulds = filter.filter((entry) =>
            Object.keys(entry).includes('bool'),
          )[0].bool.should;

          expect(shoulds.length).toEqual(2);

          for (const entry of shoulds) {
            expect(entry).toHaveProperty('match');
            const match = entry.match['metadata.sample.isolateId'];
            if (match) {
              expect(['123', '456'].includes(match)).toEqual(true);
            }
          }
        });
      });
    });
  });
});
