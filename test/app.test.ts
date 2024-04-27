import request from 'supertest';
import env from '../src/env';
import expressApp from '../src/loaders/expressApp';

describe('app', () => {
  it('responds with a not found message', (response) => {
    request(expressApp).get('/api-that-does-not-exist').set('Accept', 'application/json').expect(404, response);
  });
});

describe('GET /', () => {
  it('health check responds with a json message', (response) => {
    request(expressApp)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: `${env.APP.NAME} is up and running.`,
        },
        response
      );
  });
});
