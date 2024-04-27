import request from 'supertest';

import expressApp from '../../../../src/loaders/expressApp';

describe('/api/v1/users', () => {
  it('responds returns all users', async () => {
    request(expressApp)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      });
  });
});
