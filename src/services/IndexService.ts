import deepmerge from 'deepmerge';

import BaseService from './BaseService';

import Logger from '../logging/Logger';
import { IElasticsearchSettings } from '../types/IElasticsearchSettings';
import { IIndexOptions } from '../types/IIndexOptions';

class IndexService extends BaseService {
  constructor(settings: IElasticsearchSettings, options: IIndexOptions) {
    super(settings, options);
  }

  // logic
  async exists(index?: string): Promise<boolean> {
    Logger.debug(`IndexService#exists: index: ${index}`);
    if (index) {
      const client = this.getClient();
      Logger.debug(`IndexService#exists: client: ${client}`);
      const response = await client.indices.exists({
        index,
      });
      return response;
    }

    return false;
  }

  async createIndex(index: string, mappings: any) {
    Logger.debug(
      `IndexService#createIndex: index: ${JSON.stringify(index, null, 2)}`,
    );
    const client = this.getClient();
    const body = deepmerge(mappings, this.options);

    const payload = {
      index,
      body,
    };
    Logger.debug(
      `IndexService#createIndex: payload: ${JSON.stringify(payload, null, 2)}`,
    );

    const response = await client.indices.create(payload);
    if (response) {
      if (this.isSuccess(response)) {
        const body = this.getBody(response);
        Logger.debug(
          `IndexService#createIndex: body: ${JSON.stringify(body, null, 2)}`,
        );
        return body;
      }
    }

    return null;
  }

  async deleteIndex(index?: string) {
    Logger.debug(
      `IndexService#deleteIndex: index: ${JSON.stringify(index, null, 2)}`,
    );

    if (index) {
      const exists = await this.exists(index);
      if (exists) {
        const client = this.getClient();
        const response = await client.indices.delete({
          index,
        });
        if (response) {
          if (this.isSuccess(response)) {
            const body = this.getBody(response);
            Logger.debug(
              `IndexService#deleteIndex: body: ${JSON.stringify(
                body,
                null,
                2,
              )}`,
            );
            return body;
          }
        }
      }
    }

    return null;
  }

  async indexDocuments(index: string, documents: Array<any>, bulk = true) {
    Logger.debug(`IndexService#indexDocuments: enter`);
    if (index && documents) {
      if (bulk) {
        Logger.debug(`IndexService#indexDocuments: Bulk indexing`);
        const exists = await this.exists(index);
        Logger.debug(`IndexService#indexDocuments: Exists: ${exists}`);
        if (exists) {
          Logger.debug(`IndexService#indexDocuments: Index ${index} exists`);
          // create an operations + documents array
          const operations = [];
          const args = { id: 1 };
          for (const document of documents) {
            const id = document.id ? document.id : args.id.toString();
            operations.push({ index: { _index: index, _id: id } });
            operations.push(document);
            args.id = args.id + 1;
          }
          Logger.debug(
            `IndexService#indexDocuments: Operations ${operations.length}`,
          );

          // bulk upload operaitons
          const client = this.getClient();
          const payload = {
            body: operations,
            refresh: true,
          };
          Logger.debug(
            `IndexService#indexDocuments: Payload ${JSON.stringify(
              payload,
              null,
              2,
            )}`,
          );

          const response = await client.bulk(payload);
          Logger.debug(
            `IndexService#indexDocuments: Response ${JSON.stringify(
              response,
              null,
              2,
            )}`,
          );
          return response;
        }
      } else {
        const responses = [];
        const args: any = { id: 1 };
        for (const document of documents) {
          const response = await this.indexDocument(
            index,
            document,
            args.id.toString(),
          );
          responses.push(response);
          args.id = args.id + 1;
        }
        return responses;
      }
    }

    Logger.debug(`IndexService#indexDocuments: exit`);
    return false;
  }

  async indexDocument(index: string, document: any, requestedId = null) {
    Logger.debug(`IndexService#indexDocument: enter`);
    if (index && document) {
      Logger.debug(`IndexService#indexDocument: index and document exist`);
      const id = document.id ? document.id : requestedId;
      if (id) {
        Logger.debug(`IndexService#indexDocument: id: ${id}`);
        const exists = await this.exists(index);
        Logger.debug(`IndexService#indexDocument: index exists: ${exists}`);
        if (exists) {
          // remove id from document
          const body = Object.assign({}, document);
          delete body.id;

          const client = this.getClient();
          const payload = {
            index,
            id,
            body,
          };
          Logger.debug(
            `IndexService#indexDocument: payload: ${JSON.stringify(
              payload,
              null,
              2,
            )}`,
          );
          const response = await client.index(payload);
          Logger.debug(
            `IndexService#indexDocument: response: ${JSON.stringify(
              response,
              null,
              2,
            )}`,
          );
          if (this.isSuccess(response)) {
            return this.getBody(response);
          }
        }
      }
    }

    Logger.debug(`IndexService#indexDocument: exit`);
    return false;
  }

  async deleteDocuments(index: string, documents: Array<any>, bulk = true) {
    if (index && documents) {
      if (bulk) {
        const exists = await this.exists(index);
        if (exists) {
          // create an operations + documents array
          const operations = [];
          for (const document of documents) {
            operations.push({ delete: { _index: index, _id: document.id } });
          }

          // bulk upload operaitons
          const client = this.getClient();
          const payload = {
            body: operations,
          };

          const response = await client.bulk(payload);
          if (this.isSuccess(response)) {
            return this.getBody(response);
          }
        }
      } else {
        const responses = [];
        for (const document of documents) {
          const response = await this.deleteDocument(index, document);
          responses.push(response);
        }
        return responses;
      }
    }

    return false;
  }

  async deleteDocument(index: string, document: any) {
    Logger.debug(`IndexService#deleteDocument: enter`);
    if (index && document) {
      Logger.debug(`IndexService#deleteDocument: index: ${index}`);
      Logger.debug(
        `IndexService#deleteDocument: document: ${JSON.stringify(
          document,
          null,
          2,
        )}`,
      );
      const id = document.id ? document.id : null;
      Logger.debug(`IndexService#deleteDocument: id: ${id}`);
      if (id) {
        const exists = await this.exists(index);
        Logger.debug(`IndexService#deleteDocument: exists: ${exists}`);
        if (exists) {
          const client = this.getClient();
          Logger.debug(`IndexService#deleteDocument: client: ${client}`);

          const payload = {
            index,
            id,
          };

          Logger.debug(
            `IndexService#deleteDocument: payload: ${JSON.stringify(
              payload,
              null,
              2,
            )}`,
          );
          Logger.debug(
            `IndexService#deleteDocument: client.delete: ${client.delete}`,
          );
          const response = await client.delete(payload);
          Logger.debug(
            `IndexService#deleteDocument: response: ${JSON.stringify(
              response,
              null,
              2,
            )}`,
          );
          if (this.isSuccess(response)) {
            Logger.debug(`IndexService#deleteDocument: exit (body)`);
            return this.getBody(response);
          }
        }
      }
    }

    Logger.debug(`IndexService#deleteDocument: exit (false)`);
    return false;
  }

  async createAlias(index: string, alias: string) {
    Logger.debug(`IndexService#createAlias: enter`);
    const exists = await this.exists(index);
    Logger.debug(`IndexService#createAlias: index exists ${exists}`);
    if (exists) {
      const client = this.getClient();
      const response = await client.indices.putAlias({
        index,
        name: alias,
      });
      Logger.debug(`IndexService#createAlias: response ${response}`);
    }
  }

  async deleteAlias(index: string, alias: string) {
    Logger.debug(`IndexService#deleteAlias: enter`);
    const exists = await this.exists(index);
    Logger.debug(`IndexService#deleteAlias: index exists ${exists}`);
    if (exists) {
      const client = this.getClient();
      const response = await client.indices.deleteAlias({
        index,
        name: alias,
      });
      Logger.debug(`IndexService#deleteAlias: response ${response}`);
    }
  }

  async getAlias(alias: string) {
    Logger.debug(`IndexService#getAlias: enter`);
    const client = this.getClient();
    const response = await client.cat.aliases({
      name: alias,
    });
    Logger.debug(`IndexService#getAlias: response ${response}`);
    if (response && response.split(' ').length > 1) {
      return response.split(' ')[1];
    }

    return null;
  }

  async copyData(sourceIndex: string, destIndex: string) {
    Logger.debug(`IndexService#copyData: enter`);
    const sourceExists = await this.exists(sourceIndex);
    const destExists = await this.exists(destIndex);
    Logger.debug(`IndexService#copyData: source index exists ${sourceExists}`);
    Logger.debug(`IndexService#copyData: dest index exists ${destExists}`);
    if (sourceExists && destExists) {
      const client = this.getClient();
      const response = await client.reindex({
        body: {
          source: {
            index: sourceIndex,
          },
          dest: {
            index: destIndex,
          },
        },
      });
      Logger.debug(
        `IndexService#copyData: response ${JSON.stringify(response, null, 2)}`,
      );
    }
  }
}

export default IndexService;
