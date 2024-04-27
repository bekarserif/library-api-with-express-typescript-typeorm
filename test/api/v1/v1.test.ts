import request from 'supertest';

import expressApp from '../../../src/loaders/expressApp';

describe('/api/v1', () => {
  it('responds with a json message', (response) => {
    request(expressApp).get('/api/v1').expect('Content-Type', /json/).expect(
      200,
      {
        message: `Healthy api v1 response`,
      },
      response
    );
  });
});
