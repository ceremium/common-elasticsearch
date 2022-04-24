import SearchService from './SearchService';

let mockSearch = null;
let mockMSearch = null;

const args = {
  elasticsearchSettings: {
    scheme: 'http',
    port: '9200',
    host: 'localhost',
    log: 'debug',
    auth: {
      username: 'elastic',
      password: 'password',
    },
  },
};

describe('SearchService', () => {
  describe('search', () => {
    beforeEach(() => {
      mockSearch = jest.fn();
      jest
        .spyOn(SearchService.prototype, 'getClient')
        .mockImplementation(() => {
          return {
            search: mockSearch,
          };
        });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    describe('when valid', () => {
      describe('when sending a single search', () => {
        beforeEach(async () => {
          const settings = args.elasticsearchSettings;
          const service = new SearchService(settings, {});
          const query = { query: { match_all: {} } };

          await service.search('spotlight-dev', query);
        });
        it('should call search', () => {
          expect(mockSearch).toBeCalledTimes(1);
        });
        it('should call with a valid search body', () => {
          expect(mockSearch).toBeCalledWith({
            index: 'spotlight-dev',
            body: { query: { match_all: {} } },
          });
        });
      });
      describe('when sending multiple searches', () => {
        beforeEach(async () => {
          const settings = args.elasticsearchSettings;
          const service = new SearchService(settings, {});

          const queries = {
            core: { query: { match_all: {} } },
            second: { query: { match_all: {} } },
          };
          await service.search('spotlight-dev', queries);
        });
        it('should call search for each query', () => {
          expect(mockSearch).toBeCalledTimes(2);
        });
        it('should call with a valid search body', () => {
          expect(mockSearch).toBeCalledWith({
            index: 'spotlight-dev',
            body: { query: { match_all: {} } },
          });
        });
      });
    });
    describe('when not valid', () => {
      describe('when index is null', () => {
        it('should return null', async () => {
          const settings = args.elasticsearchSettings;
          const service = new SearchService(settings, {});

          const response = await service.search(null, { match_all: {} });
          expect(response).toBeNull();
        });
      });
      describe('when index is undefined', () => {
        it('should return null', async () => {
          const settings = args.elasticsearchSettings;
          const service = new SearchService(settings, {});
          const index = undefined;

          const response = await service.search(index, { match_all: {} });
          expect(response).toBeNull();
        });
      });
      describe('when queries is null', () => {
        it('should return null', async () => {
          const settings = args.elasticsearchSettings;
          const service = new SearchService(settings, {});

          const response = await service.search('spotlight-dev', null);
          expect(response).toBeNull();
        });
      });
      describe('when queries is undefined', () => {
        it('should return null', async () => {
          const settings = args.elasticsearchSettings;
          const service = new SearchService(settings, {});
          const query = undefined;

          const response = await service.search('spotlight-dev', query);
          expect(response).toBeNull();
        });
      });
    });
  });
  describe('search', () => {
    beforeEach(() => {
      mockMSearch = jest.fn();
      jest
        .spyOn(SearchService.prototype, 'getClient')
        .mockImplementation(() => {
          return {
            msearch: mockMSearch,
          };
        });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    describe('when valid', () => {
      describe('when sending a searches', () => {
        beforeEach(async () => {
          const settings = args.elasticsearchSettings;
          const service = new SearchService(settings, {});
          const queries = [
            { index: 'spotlight-dev' },
            { query: { match_all: {} } },
            { index: 'spotlight-dev' },
            {
              query: {
                bool: {
                  must: {
                    match: {
                      message: 'this is a test',
                    },
                  },
                },
              },
            },
          ];

          await service.msearch('spotlight-dev', queries);
        });
        it('should call search', () => {
          expect(mockMSearch).toBeCalledTimes(1);
        });
        it('should call with a valid search body', () => {
          const bulk = [
            { index: 'spotlight-dev' },
            { query: { match_all: {} } },
            { index: 'spotlight-dev' },
            {
              query: {
                bool: {
                  must: {
                    match: {
                      message: 'this is a test',
                    },
                  },
                },
              },
            },
          ];
          expect(mockMSearch).toBeCalledWith({
            index: 'spotlight-dev',
            body: bulk,
          });
        });
      });
    });
  });
});
