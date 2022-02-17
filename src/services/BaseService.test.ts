import elasticsearch from '@elastic/elasticsearch';
import BaseService from './BaseService';

// mock elasticsearch module - no underlying implementation needed
jest.mock('@elastic/elasticsearch');

afterEach(() => {
  // clear all mock call data
  jest.clearAllMocks();
});

describe('BaseService', () => {
  describe('#constructor', () => {
    it('should initialise settings', () => {
      const service = new BaseService({
        scheme: 'http',
        host: 'localhost',
        port: '9200',
        index: 'spotlight',
        log: 'info',
      });
      expect(service.settings).toEqual({
        scheme: 'http',
        host: 'localhost',
        port: '9200',
        index: 'spotlight',
        log: 'info',
      });
    });
    it('should initialise options', () => {
      const service = new BaseService(
        {
          scheme: 'http',
          host: 'localhost',
          port: '9200',
          index: 'spotlight',
          log: 'info',
        },
        { two: 'two' },
      );
      expect(service.options).toEqual({ two: 'two' });
    });
  });
  describe('#getClient', () => {
    describe('when a client has not been created', () => {
      it('should instantiate a new client', () => {
        const service = new BaseService({
          scheme: 'http',
          host: 'localhost',
          port: '9200',
          index: 'spotlight',
          log: 'info',
        });
        const client = service.getClient();
        expect(elasticsearch.Client).toHaveBeenCalledTimes(1);
      });
      it('should return a new client', () => {
        const service = new BaseService({
          scheme: 'http',
          host: 'localhost',
          port: '9200',
          index: 'spotlight',
          log: 'info',
        });
        const client = service.getClient();

        expect(client).toBeDefined();
      });
    });
    describe('when a client has been created previously', () => {
      it('should return the existing client', () => {
        const service = new BaseService({
          scheme: 'http',
          host: 'localhost',
          port: '9200',
          index: 'spotlight',
          log: 'info',
        });
        const client = service.getClient();
        const clientSecond = service.getClient();

        expect(elasticsearch.Client).toHaveBeenCalledTimes(1);
      });
    });
    describe('when no settings are provided', () => {
      it('should return null', () => {
        const service = new BaseService();
        const client = service.getClient();
        expect(client).toBeNull();
      });
    });
  });
  describe('#getStatusCode', () => {
    describe('when statusCode is set', () => {
      it('should return the statusCode', () => {
        const service = new BaseService();
        const statusCode = service.getStatusCode({ statusCode: 200 });
        expect(statusCode).toEqual(200);
      });
    });
    describe('when statusCode is not set', () => {
      it('should return null', () => {
        const service = new BaseService();
        const statusCode = service.getStatusCode({});
        expect(statusCode).toEqual(null);
      });
    });
  });
  describe('#getBody', () => {
    describe('when body is set', () => {
      it('should return the body', () => {
        const service = new BaseService();
        const body = service.getBody({ body: 'body' });
        expect(body).toEqual('body');
      });
    });
    describe('when body is not set', () => {
      it('should return null', () => {
        const service = new BaseService();
        const body = service.getBody({});
        expect(body).toEqual(body);
      });
    });
  });
  describe('#isSuccess', () => {
    describe('when statusCode is 200', () => {
      it('should return true', () => {
        const service = new BaseService();
        const success = service.isSuccess({ statusCode: 200 });
        expect(success).toEqual(true);
      });
    });
    describe('when statusCode is not 200', () => {
      it('should return false', () => {
        const service = new BaseService();
        const success = service.isSuccess({ statusCode: 404 });
        expect(success).toEqual(false);
      });
    });
    describe('when statusCode is missing', () => {
      it('should return false', () => {
        const service = new BaseService();
        const success = service.isSuccess({});
        expect(success).toEqual(false);
      });
    });
  });
});
