const getElasticsearchUrl = () => {
  if (
    process.env.ES_USERNAME &&
    process.env.ES_PASSWORD &&
    process.env.ES_PORT
  ) {
    return `${process.env.ES_SCHEME}://${process.env.ES_USERNAME}:${process.env.ES_PASSWORD}@${process.env.ES_HOST}:${process.env.ES_PORT}`;
  } else if (process.env.ES_USERNAME && process.env.ES_PASSWORD) {
    return `${process.env.ES_SCHEME}://${process.env.ES_USERNAME}:${process.env.ES_PASSWORD}@${process.env.ES_HOST}`;
  } else if (
    process.env.ES_SCHEME &&
    process.env.ES_HOST &&
    process.env.ES_PORT
  ) {
    return `${process.env.ES_SCHEME}://${process.env.ES_HOST}:${process.env.ES_PORT}`;
  } else if (process.env.ES_SCHEME && process.env.ES_HOST) {
    return `${process.env.ES_SCHEME}://${process.env.ES_HOST}`;
  } else {
    return 'http://localhost:9200';
  }
};

export default {
  log: 'error',
  resultsPerPage: 10,
  settings: {
    'index.mapping.total_fields.limit': 2000,
  },
  indexSizeLimit: 1000,
  host: getElasticsearchUrl(),
};
