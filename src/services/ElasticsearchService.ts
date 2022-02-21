import { IElasticsearchSettings } from '../types/IElasticsearchSettings';
import { IElasticsearchOptions } from '../types/IElasticsearchOptions';
import { ISearchOptions } from '../types/ISearchOptions';
import { IIndexOptions } from '../types/IIndexOptions';
import Logger from '../logging/Logger';
import SearchService from './SearchService';
import IndexService from './IndexService';

class ElasticsearchService {
  settings: IElasticsearchSettings;
  options: IElasticsearchOptions;
  searchService: SearchService;
  indexService: IndexService;

  constructor(
    settings: IElasticsearchSettings,
    options: IElasticsearchOptions,
  ) {
    if (!this.isValidSettings(settings)) {
      throw new Error('Invalid config for ElasticsearchService');
    }

    this.settings = settings;
    this.options = options;

    // delegates
    const searchOptions = this.getSearchOptions(options);
    this.searchService = new SearchService(settings, searchOptions);
    const indexOptions = this.getIndexOptions(options);
    this.indexService = new IndexService(settings, indexOptions);
  }

  // config
  isValidSettings(settings: IElasticsearchSettings) {
    Logger.debug(`ElasticsearchService#isValidSettings: enter`);
    Logger.debug(
      `ElasticsearchService#isValidSettings: node: ${settings.node}`,
    );
    if (settings && settings.node) {
      Logger.debug(`ElasticsearchService#isValidSettings: Settings are valid`);
      return true;
    }
    Logger.debug(`ElasticsearchService#isValidSettings: Settings are invalid`);
    return false;
  }

  getSearchOptions(options: IElasticsearchOptions): ISearchOptions {
    Logger.debug(`ElasticsearchService#getSearchOptions: enter`);
    if (options && options.search) {
      return options.search;
    }
    return {};
  }

  getIndexOptions(options: IElasticsearchOptions): IIndexOptions {
    Logger.debug(`ElasticsearchService#getIndexOptions: enter`);
    if (options && options.index) {
      return options.index;
    }
    return {};
  }

  // delegates - index
  indexExists(index: string) {
    Logger.debug(`ElasticsearchService#indexExists: enter`);
    return this.indexService.exists(index);
  }

  createIndex(index: string, mappings: any) {
    Logger.debug(`ElasticsearchService#createIndex: enter`);
    return this.indexService.createIndex(index, mappings);
  }

  deleteIndex(index: string) {
    Logger.debug(`ElasticsearchService#deleteIndex: enter`);
    return this.indexService.deleteIndex(index);
  }

  indexDocuments(index: string, documents: Array<any>) {
    Logger.debug(`ElasticsearchService#indexDocuments: enter`);
    return this.indexService.indexDocuments(index, documents);
  }

  indexDocument(index: string, document: any) {
    Logger.debug(`ElasticsearchService#indexDocument: enter`);
    return this.indexService.indexDocument(index, document);
  }

  deleteDocuments(index: string, documents: Array<any>) {
    Logger.debug(`ElasticsearchService#deleteDocuments: enter`);
    return this.indexService.deleteDocuments(index, documents);
  }

  deleteDocument(index: string, document: any) {
    Logger.debug(`ElasticsearchService#deleteDocument: enter`);
    return this.indexService.deleteDocument(index, document);
  }

  // delegates - search
  search(index: string, query: any, options: ISearchOptions) {
    Logger.debug(`ElasticsearchService#search: enter`);
    Logger.debug(`ElasticsearchService#search: index: ${index}`);
    Logger.debug(
      `ElasticsearchService#search: query: ${JSON.stringify(query)}`,
    );
    Logger.debug(
      `ElasticsearchService#search: options: ${JSON.stringify(options)}`,
    );
    return this.searchService.search(index, query, options);
  }
}

export default ElasticsearchService;
