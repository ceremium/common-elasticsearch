import ChoicesJSONTransformer from './ChoicesJSONTransformer';
import Results from './__fixtures__/Results';

const titles = {
  'involved.type': {
    title: 'Type involved',
    titles: ['Involved', 'Type involved'],
  },
  'involved.role': {
    title: 'Role involved',
    titles: ['Involved', 'Role involved'],
  },
  'when.when': {
    title: 'When',
    titles: ['When', 'When'],
  },
  'slipsTripsFallsAndCollisions.fallsLastYear': {
    title: 'Falls last year',
    titles: ['Slips,trips,Falls and collisions', 'Falls last year'],
  },
};

describe('ChoicesJSONTransformer', () => {
  describe('#transform', () => {
    describe('when using flattened aggregations', () => {
      describe('when there is no jsonschema', () => {
        it('should transform aggregations into choices', async () => {
          const transformer = new ChoicesJSONTransformer();
          const result = await transformer.transform(Results.ranges);

          const type = result['involved.type'];
          const role = result['involved.role'];
          const when = result['when.when'];
          const falls = result['slipsTripsFallsAndCollisions.fallsLastYear'];

          // keywords
          const patient = type.choices.filter(
            (item) => item.key === 'Patient',
          )[0];
          const employee = type.choices.filter(
            (item) => item.key === 'Employee/Member of staff',
          )[0];

          expect(patient.count).toEqual(6);
          expect(employee.count).toEqual(3);

          const victim = role.choices.filter(
            (item) => item.key === 'Victim (Violence and Agression)',
          )[0];
          expect(victim.count).toEqual(9);

          // ranges - date
          expect(when.min).toEqual('2018-04-03T14:03:00.036Z');
          expect(when.max).toEqual('2018-05-03T12:09:57.322Z');

          // ranges - number
          expect(falls.min).toEqual(1);
          expect(falls.max).toEqual(8);
        });
        it('should transform choices with no buckets', async () => {
          const transformer = new ChoicesJSONTransformer();
          const result = await transformer.transform(Results.rangesNoBuckets);

          const role = result['involved.role'];

          expect(role).toEqual({ choices: [] });
        });
        it('should transform boolean choices', async () => {
          const transformer = new ChoicesJSONTransformer();
          const result = await transformer.transform(Results.ranges);

          const mdr = result['results.predictor.mdr'];
          const xdr = result['results.predictor.xdr'];

          expect(mdr.choices[0].key).toEqual(true);
          expect(xdr.choices[0].key).toEqual(false);
        });
      });
      describe('when titles are provided', () => {
        it('should transform aggregations into choices with title', async () => {
          const transformer = new ChoicesJSONTransformer();
          const result = await transformer.transform(Results.ranges, {
            titles,
          });

          const type = result['involved.type'];
          const role = result['involved.role'];
          const when = result['when.when'];
          const falls = result['slipsTripsFallsAndCollisions.fallsLastYear'];

          expect(type.title).toEqual('Type involved');
          expect(role.title).toEqual('Role involved');
          expect(when.title).toEqual('When');
          expect(falls.title).toEqual('Falls last year');

          expect(type.titles).toEqual(['Involved', 'Type involved']);
          expect(role.titles).toEqual(['Involved', 'Role involved']);
          expect(when.titles).toEqual(['When', 'When']);
          expect(falls.titles).toEqual([
            'Slips,trips,Falls and collisions',
            'Falls last year',
          ]);
        });
        it('should add title to choices', async () => {
          const transformer = new ChoicesJSONTransformer();
          const result = await transformer.transform(Results.rangesNoBuckets, {
            titles,
          });

          const type = result['involved.type'];
          const role = result['involved.role'];
          const when = result['when.when'];
          const falls = result['slipsTripsFallsAndCollisions.fallsLastYear'];

          expect(type.title).toEqual('Type involved');
          expect(role.title).toEqual('Role involved');
          expect(when.title).toEqual('When');
          expect(falls.title).toEqual('Falls last year');

          expect(type.titles).toEqual(['Involved', 'Type involved']);
          expect(role.titles).toEqual(['Involved', 'Role involved']);
          expect(when.titles).toEqual(['When', 'When']);
          expect(falls.titles).toEqual([
            'Slips,trips,Falls and collisions',
            'Falls last year',
          ]);
        });
      });
      describe('when using from to ranges', () => {
        it('should transform from to choices', async () => {
          const transformer = new ChoicesJSONTransformer();
          const result: any = await transformer.transform(
            Results.rangesWithFromTo,
            {
              titles,
            },
          );
          expect(result).toHaveProperty('readingTimeMinutes');
          expect(result.readingTimeMinutes).toHaveProperty('choices');
          expect(result.readingTimeMinutes.choices.length).toEqual(3);
        });
        it('should add min and max to choices', async () => {
          const transformer = new ChoicesJSONTransformer();
          const result: any = await transformer.transform(
            Results.rangesWithFromTo,
            {
              titles,
            },
          );
          expect(result).toHaveProperty('readingTimeMinutes');
          expect(result.readingTimeMinutes).toHaveProperty('choices');
          const choices = result.readingTimeMinutes.choices;
          const byKey = {};

          for (const entry of choices) {
            byKey[entry.key] = entry;
          }

          expect(byKey['*-5.0'].max).toEqual(5.0);
          expect(byKey['5.0-10.0'].min).toEqual(5.0);
          expect(byKey['5.0-10.0'].max).toEqual(10.0);
          expect(byKey['10.0-*'].min).toEqual(10.0);
        });
      });
    });
    describe('when using nested aggregations', () => {
      it('should transform aggregations', async () => {
        const transformer = new ChoicesJSONTransformer();
        const result = await transformer.transform(Results.nestedAggregations, {
          titles,
        });

        const status = result['status'];
        const type = result['type.type'];
        const category = result['type.category'];
        const subCategory = result['type.subCategory'];
        const specialty = result['specialty.specialty'];
        const site = result['where.site'];
        const involvedPersonType = result['involved.personType'];
        const involvedRole = result['involved.role'];
        const involvedGender = result['involved.gender'];
        const harmResult = result['harm.result'];
        const harmActualImpact = result['harm.actualImpact'];

        expect(status).toBeTruthy();
        expect(type).toBeTruthy();
        expect(category).toBeTruthy();
        expect(subCategory).toBeTruthy();
        expect(specialty).toBeTruthy();
        expect(site).toBeTruthy();
        expect(involvedPersonType).toBeTruthy();
        expect(involvedRole).toBeTruthy();
        expect(involvedGender).toBeTruthy();
        expect(harmResult).toBeTruthy();
        expect(harmActualImpact).toBeTruthy();
      });
    });
  });
});
