import { Client } from '@elastic/elasticsearch';

import Logger from '../logging/Logger';
import { IElasticsearchOptions } from '../types/IElasticsearchOptions';
import { IElasticsearchSettings } from '../types/IElasticsearchSettings';

class BaseService {
  settings?: IElasticsearchSettings;
  options: IElasticsearchOptions;
  client: any;

  constructor(settings?: IElasticsearchSettings, options?: any) {
    Logger.debug(
      `BaseService#constructor: settings: ${JSON.stringify(settings, null, 2)}`,
    );
    this.settings = settings;
    Logger.debug(
      `BaseService#constructor: options: ${JSON.stringify(options, null, 2)}`,
    );
    this.options = options;
  }

  getClient() {
    Logger.debug(`BaseService#getClient: enter`);
    if (this.client) {
      Logger.debug(`BaseService#getClient: Client exists`);
      return this.client;
    }

    Logger.debug(
      `BaseService#getClient: Settings: ${JSON.stringify(
        this.settings,
        null,
        2,
      )}`,
    );
    if (this.settings) {
      this.client = new Client(this.settings);
      Logger.debug(
        `BaseService#getClient: Client initialized, returning client`,
      );
      return this.client;
    }

    Logger.debug(`BaseService#getClient: No settings, returning null`);
    return null;
  }

  isSuccess(result: any) {
    const statusCode = this.getStatusCode(result);
    Logger.debug(`BaseService#isSuccess: statusCode: ${statusCode}`);
    if (statusCode && statusCode === 200) {
      return true;
    }
    return false;
  }

  getStatusCode(result: any) {
    if (result && result.statusCode) {
      return result.statusCode;
    }

    return null;
  }

  getBody(result: any) {
    if (result && result.body) {
      return result.body;
    }
  }
}

export default BaseService;
