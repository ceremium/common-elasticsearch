interface IElasticsearchSettings {
  host?: string;
  scheme?: string;
  port?: number;
  node?: string;
  log?: string;
  auth?: IAuth;
}

interface IAuth {
  username: string;
  password: string;
}
export { IElasticsearchSettings };
