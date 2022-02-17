import IndexService from './IndexService';

let mockExists = jest.fn();
const mockCreate = jest.fn();
const mockBulk = jest.fn();
const mockIndex = jest.fn();
const mockDelete = jest.fn();
const mockDeleteDocument = jest.fn();

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

describe('IndexService', () => {
  beforeEach(() => {
    mockExists = jest.fn();
    jest.spyOn(IndexService.prototype, 'getClient').mockImplementation(() => {
      return {
        indices: {
          exists: mockExists,
          create: mockCreate,
          delete: mockDelete,
        },
        index: mockIndex,
        bulk: mockBulk,
        delete: mockDeleteDocument,
      };
    });
    mockExists.mockClear();
    mockCreate.mockClear();
    mockBulk.mockClear();
    mockIndex.mockClear();
    mockDelete.mockClear();
    mockDeleteDocument.mockClear();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('#exists', () => {
    describe('when an index is specified', () => {
      it('should call elasticsearch index exists method', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        mockExists.mockReturnValue({ statusCode: 200, body: true });
        await service.exists('questions');
        expect(mockExists).toHaveBeenCalledTimes(1);
      });
      it('should call elasticsearch index exists method with the index name', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        mockExists.mockReturnValue({ statusCode: 200, body: true });
        await service.exists('questions');
        expect(mockExists).toHaveBeenCalledWith({ index: 'questions' });
      });
      describe('when elasticsearch returns true', () => {
        it('should return true', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          mockExists.mockReturnValue({ statusCode: 200, body: true });
          const indexExists = await service.exists('questions');
          expect(indexExists).toEqual(true);
        });
      });
      describe('when elasticsearch returns false', () => {
        it('should return false', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          mockExists.mockReturnValue(false);
          const indexExists = await service.exists('questions');
          expect(indexExists).toEqual(false);
        });
      });
    });
    describe('when an index is specified', () => {
      it('should not call elasticsearch false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        mockExists.mockReturnValue({ statusCode: 200, body: true });
        await service.exists();
        expect(mockExists).toHaveBeenCalledTimes(0);
      });
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        mockExists.mockReturnValue({ statusCode: 200, body: true });
        const indexExists = await service.exists();
        expect(indexExists).toEqual(false);
      });
    });
  });
  describe('#createIndex', () => {
    describe('when an index and schema are specified', () => {
      describe('when the index does not exist', () => {
        it('should call elasticsearch index createIndex method', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          mockExists.mockReturnValue(false);
          await service.createIndex('questions', {});
          expect(mockCreate).toHaveBeenCalledTimes(1);
        });
        it('should call elasticsearch create method with the mappings', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          mockExists.mockReturnValue(false);
          await service.createIndex('questions', {});
          expect(mockCreate).toHaveBeenCalledWith({
            body: {},
            index: 'questions',
          });
        });
      });
    });
  });
  describe('#deleteIndex', () => {
    describe('when an index is specified', () => {
      describe('when the index exists', () => {
        it('should call elasticsearch index deleteIndex method', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          mockExists.mockReturnValue({ statusCode: 200, body: true });
          await service.deleteIndex('questions');
          expect(mockDelete).toHaveBeenCalledTimes(1);
        });
        it('should call elasticsearch deleteIndex method with the index name', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          mockExists.mockReturnValue({ statusCode: 200, body: true });
          await service.deleteIndex('questions');
          expect(mockDelete).toHaveBeenCalledWith({ index: 'questions' });
        });
      });
      describe('when the index does not exist', () => {
        it('should not call elasticsearch delete method', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          mockExists.mockReturnValue(false);
          await service.deleteIndex('questions');
          expect(mockDelete).toHaveBeenCalledTimes(0);
        });
      });
    });
    describe('when an index is not specified', () => {
      it('should not call elasticsearch delete method', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        mockExists.mockReturnValue(false);
        await service.deleteIndex();
        expect(mockExists).toHaveBeenCalledTimes(0);
        expect(mockDelete).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe('#indexDocument', () => {
    describe('when the index is specified and document is specified', () => {
      describe('when the document has an id', () => {
        describe('when the index exists', () => {
          it('should call the index method', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.indexDocument('questions', {
              id: '1',
              one: 'two',
            });
            expect(mockIndex).toHaveBeenCalledTimes(1);
          });
        });
        describe('when the index does not exist', () => {
          it('should return false', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue(false);
            const response = await service.indexDocument('questions', {
              id: '1',
              one: 'two',
            });
            expect(response).toEqual(false);
          });
          it('should not call the index method', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue(false);
            await service.indexDocument('questions', {
              id: '1',
              one: 'two',
            });
            expect(mockIndex).toHaveBeenCalledTimes(0);
          });
        });
      });
      describe('when the document does not have an id', () => {
        it('should return false', async () => {
          const settings = args.elasticsearchSettings;
          const service = new IndexService(settings, {});

          const response = await service.indexDocument('questions', {
            one: 'two',
          });
          expect(response).toEqual(false);
        });
      });
    });
    describe('when the index is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.indexDocument(null, {
          id: '1',
          one: 'two',
        });
        expect(response).toEqual(false);
      });
    });
    describe('when the document is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.indexDocument('questions', null, null);
        expect(response).toEqual(false);
      });
    });
  });
  describe('#indexDocuments', () => {
    describe('when the index is specified and document is specified', () => {
      describe('when not bulk indexing', () => {
        describe('when documents contain ids', () => {
          it('should call index for each document', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.indexDocuments(
              'questions',
              [
                {
                  id: '3',
                  one: 'two',
                },
                {
                  id: '4',
                  two: 'three',
                },
              ],
              false,
            );
            expect(mockBulk).toHaveBeenCalledTimes(0);
            expect(mockIndex).toHaveBeenCalledTimes(2);
          });
          it('should call index with a payload', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.indexDocuments(
              'questions',
              [
                {
                  id: '3',
                  one: 'two',
                },
                {
                  id: '4',
                  two: 'three',
                },
              ],
              false,
            );
            expect(mockIndex).toHaveBeenCalledWith({
              id: '3',
              body: {
                one: 'two',
              },
              index: 'questions',
            });
            expect(mockIndex).toHaveBeenCalledWith({
              id: '4',
              body: {
                two: 'three',
              },
              index: 'questions',
            });
          });
        });
        describe('when documents does not contain ids', () => {
          it('should call index for each document', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.indexDocuments(
              'questions',
              [
                {
                  one: 'two',
                },
                {
                  two: 'three',
                },
              ],
              false,
            );
            expect(mockBulk).toHaveBeenCalledTimes(0);
            expect(mockIndex).toHaveBeenCalledTimes(2);
          });
          it('should call index with the payload', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.indexDocuments(
              'questions',
              [
                {
                  one: 'two',
                },
                {
                  two: 'three',
                },
              ],
              false,
            );

            expect(mockIndex).toHaveBeenCalledWith({
              id: '1',
              body: {
                one: 'two',
              },
              index: 'questions',
            });
            expect(mockIndex).toHaveBeenCalledWith({
              id: '2',
              body: {
                two: 'three',
              },
              index: 'questions',
            });
          });
        });
      });
      describe('when bulk indexing', () => {
        describe('when the index exists', () => {
          describe('when documents contain ids', () => {
            it('should call the bulk method', async () => {
              const settings = args.elasticsearchSettings;
              const service = new IndexService(settings, {});

              mockExists.mockReturnValue({ statusCode: 200, body: true });
              await service.indexDocuments(
                'questions',
                [
                  {
                    id: '3',
                    one: 'two',
                  },
                  {
                    id: '4',
                    two: 'three',
                  },
                ],
                true,
              );
              expect(mockBulk).toHaveBeenCalledTimes(1);
              expect(mockIndex).toHaveBeenCalledTimes(0);
            });
            it('should call the bulk method with operations', async () => {
              const settings = args.elasticsearchSettings;
              const service = new IndexService(settings, {});

              mockExists.mockReturnValue({ statusCode: 200, body: true });
              await service.indexDocuments(
                'questions',
                [
                  {
                    id: '3',
                    one: 'two',
                  },
                  {
                    id: '4',
                    two: 'three',
                  },
                ],
                true,
              );
              expect(mockBulk).toHaveBeenCalledWith({
                body: [
                  {
                    index: { _index: 'questions', _id: '3' },
                  },
                  {
                    id: '3',
                    one: 'two',
                  },
                  {
                    index: { _index: 'questions', _id: '4' },
                  },
                  {
                    id: '4',
                    two: 'three',
                  },
                ],
              });
            });
          });
          describe('when documents does not contain ids', () => {
            it('should call the bulk method', async () => {
              const settings = args.elasticsearchSettings;
              const service = new IndexService(settings, {});

              mockExists.mockReturnValue({ statusCode: 200, body: true });
              await service.indexDocuments(
                'questions',
                [
                  {
                    one: 'two',
                  },
                  {
                    two: 'three',
                  },
                ],
                true,
              );
              expect(mockBulk).toHaveBeenCalledTimes(1);
              expect(mockIndex).toHaveBeenCalledTimes(0);
            });
            it('should call the bulk method with operations using generated ids', async () => {
              const settings = args.elasticsearchSettings;
              const service = new IndexService(settings, {});

              mockExists.mockReturnValue({ statusCode: 200, body: true });
              await service.indexDocuments(
                'questions',
                [
                  {
                    one: 'two',
                  },
                  {
                    two: 'three',
                  },
                ],
                true,
              );
              expect(mockBulk).toHaveBeenCalledWith({
                body: [
                  {
                    index: { _index: 'questions', _id: '1' },
                  },
                  {
                    one: 'two',
                  },
                  {
                    index: { _index: 'questions', _id: '2' },
                  },
                  {
                    two: 'three',
                  },
                ],
              });
            });
          });
        });
        describe('when the index does not exist', () => {
          it('should call not call the bulk method', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue(false);
            await service.indexDocuments('questions', [
              {
                id: '1',
                one: 'two',
              },
            ]);
            expect(mockBulk).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
    describe('when the index is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.indexDocuments(null, [
          { id: '1', one: 'two' },
        ]);
        expect(response).toEqual(false);
      });
    });
    describe('when the document is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.indexDocuments('questions', null);
        expect(response).toEqual(false);
      });
    });
  });
  describe('#deleteDocument', () => {
    describe('when the index is specified and document is specified', () => {
      describe('when the document has an id', () => {
        describe('when the index exists', () => {
          it('should call the delete method', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.deleteDocument('questions', {
              id: '1',
              one: 'two',
            });
            expect(mockDeleteDocument).toHaveBeenCalledTimes(1);
          });
          it('should call the delete method with the id and index', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.deleteDocument('questions', {
              id: '1',
              one: 'two',
            });
            expect(mockDeleteDocument).toHaveBeenCalledWith({
              index: 'questions',
              id: '1',
            });
          });
        });
        describe('when the index does not exist', () => {
          it('should return false', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue(false);
            const response = await service.deleteDocument('questions', {
              id: '1',
              one: 'two',
            });
            expect(mockDeleteDocument).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
    describe('when the index is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.deleteDocument(null, [
          { id: '1', one: 'two' },
        ]);
        expect(response).toEqual(false);
      });
    });
    describe('when the document is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.deleteDocument('questions', null);
        expect(response).toEqual(false);
      });
    });
  });
  describe('#deleteDocuments', () => {
    describe('when the index is specified and document is specified', () => {
      describe('when not bulk indexing', () => {
        describe('when the index does not exist', () => {
          it('should call not call the delete method', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue(false);
            await service.indexDocuments('questions', [
              {
                id: '1',
                one: 'two',
              },
            ]);
            expect(mockDeleteDocument).toHaveBeenCalledTimes(0);
          });
        });
        describe('when the index exists', () => {
          it('should call delete method for each document', async () => {
            mockExists.mockReturnValue({ statusCode: 200, body: true });
            mockDeleteDocument.mockReturnValue((payload) => {
              return {
                statusCode: 200,
                body: {
                  _id: payload.id,
                },
              };
            });

            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            await service.deleteDocuments(
              'questions',
              [
                {
                  id: '1',
                  one: 'two',
                },
                {
                  id: '2',
                  two: 'three',
                },
              ],
              false,
            );
            expect(mockBulk).toHaveBeenCalledTimes(0);
            expect(mockDeleteDocument).toHaveBeenCalledTimes(2);
          });
        });
      });
      describe('when bulk indexing', () => {
        describe('when the index exists', () => {
          it('should call the bulk method', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.deleteDocuments(
              'questions',
              [
                {
                  id: '1',
                  one: 'two',
                },
                {
                  id: '2',
                  two: 'three',
                },
              ],
              true,
            );
            expect(mockBulk).toHaveBeenCalledTimes(1);
            expect(mockDeleteDocument).toHaveBeenCalledTimes(0);
          });
          it('should call the bulk method with operations', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue({ statusCode: 200, body: true });
            await service.deleteDocuments(
              'questions',
              [
                {
                  id: '1',
                  one: 'two',
                },
                {
                  id: '2',
                  two: 'three',
                },
              ],
              true,
            );
            expect(mockBulk).toHaveBeenCalledWith({
              body: [
                {
                  delete: { _index: 'questions', _id: '1' },
                },
                {
                  delete: { _index: 'questions', _id: '2' },
                },
              ],
            });
          });
        });
        describe('when the index does not exist', () => {
          it('should call not call the bulk method', async () => {
            const settings = args.elasticsearchSettings;
            const service = new IndexService(settings, {});

            mockExists.mockReturnValue(false);
            await service.deleteDocuments('questions', [
              {
                id: '1',
                one: 'two',
              },
            ]);
            expect(mockBulk).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
    describe('when the index is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.deleteDocuments(null, [
          { id: '1', one: 'two' },
        ]);
        expect(response).toEqual(false);
      });
    });
    describe('when the document is not specified', () => {
      it('should return false', async () => {
        const settings = args.elasticsearchSettings;
        const service = new IndexService(settings, {});

        const response = await service.deleteDocuments('questions', null);
        expect(response).toEqual(false);
      });
    });
  });
});
