import SearchQuery from './SearchQuery';
import CountSearchQuery from './CountSearchQuery';

describe('CountSearchQuery', () => {
  describe('#constructor', () => {
    it('should initialise the search query', () => {
      const filters = { firstname: 'Mark' };
      const query = new SearchQuery(filters, 'person');
      const countQuery = new CountSearchQuery(query);

      expect(countQuery.searchQuery).toBeTruthy();
    });
  });
  describe('#toJSON', () => {
    describe('#constructor', () => {
      it('should initialise remove size', () => {
        const filters = { firstname: 'Mark' };
        const query = new SearchQuery(filters, 'person');
        const countQuery = new CountSearchQuery(query);
        const json = countQuery.toJSON();

        expect(json).not.toHaveProperty('from');
      });
      it('should initialise remove from', () => {
        const filters = { firstname: 'Mark' };
        const query = new SearchQuery(filters, 'person');
        const countQuery = new CountSearchQuery(query);
        const json = countQuery.toJSON();

        expect(json).not.toHaveProperty('from');
      });
      it('should initialise remove sort', () => {
        const filters = { firstname: 'Mark' };
        const query = new SearchQuery(filters, 'person');
        query.setSort('dob');
        query.setOrder('asc');
        const countQuery = new CountSearchQuery(query);
        const json = countQuery.toJSON();

        expect(json).not.toHaveProperty('sort');
      });
    });
  });
});
