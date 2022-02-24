import AggregationSearchQuery from './AggregationSearchQuery';

describe('AggregationSearchQuery', () => {
  describe('#constructor', () => {
    it('should initialise filters', () => {
      const filters = { firstname: 'Mark' };
      const query = new AggregationSearchQuery(filters);
      expect(Object.keys(query.filters).includes('firstname')).toEqual(true);
    });
  });
  describe('#buildSearchQuery', () => {
    it('should support aggregations', () => {
      const aggregations = {
        aggs: {
          template: {
            terms: {
              field: 'template',
            },
          },
          audience: {
            terms: {
              field: 'audience',
            },
          },
          readingTimeMinutes: {
            range: {
              field: 'readingTimeMinutes',
              ranges: [{ to: 5 }, { from: 5, to: 10 }, { from: 10 }],
            },
          },
        },
      };
      const query = new AggregationSearchQuery({}, { aggregations });
      const json = query.toJSON();

      expect(json).toHaveProperty('from', 0);
      expect(json).toHaveProperty('size', 10);
      expect(json).toHaveProperty('aggs', {
        template: {
          terms: {
            field: 'template',
          },
        },
        audience: {
          terms: {
            field: 'audience',
          },
        },
        readingTimeMinutes: {
          range: {
            field: 'readingTimeMinutes',
            ranges: [
              {
                to: 5,
              },
              {
                from: 5,
                to: 10,
              },
              {
                from: 10,
              },
            ],
          },
        },
      });
    });
  });
});
