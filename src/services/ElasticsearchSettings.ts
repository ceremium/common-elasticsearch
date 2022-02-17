import Logger from '../logging/Logger';
import { IElasticsearchSettings } from '../types/IElasticsearchSettings';
class ElasticsearchSettings {
  settings?: IElasticsearchSettings;
  constructor(settings?: IElasticsearchSettings) {
    this.settings = settings;
  }

  getSettings() {
    if (this.settings) {
      const { scheme, host, port, log, auth } = this.settings;
      Logger.debug(`ElasticsearchSettings#getSettings: scheme: ${scheme}`);
      Logger.debug(`ElasticsearchSettings#getSettings: host: ${host}`);
      Logger.debug(`ElasticsearchSettings#getSettings: port: ${port}`);
      Logger.debug(`ElasticsearchSettings#getSettings: log: ${log}`);

      if (scheme && host && port && log) {
        const elasticSettings: IElasticsearchSettings = {
          node: `${scheme}://${host}:${port}`,
          log,
        };
        if (auth && auth.username && auth.password) {
          elasticSettings.auth = auth;
        }

        return elasticSettings;
      }
    }

    return null;
  }
}

export default ElasticsearchSettings;
