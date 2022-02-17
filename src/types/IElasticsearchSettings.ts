interface IElasticsearchSettings {
  host?: string;
  scheme?: string;
  port?: string;
  node?: string;
  index?: string;
  log?: string;
  auth?: IAuth;
}

interface IAuth {
  username: string;
  password: string;
}
export { IElasticsearchSettings };
