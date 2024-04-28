import request from 'supertest';

import expressApp from '../../../../src/loaders/expressApp';

describe('GET api/v1/books', () => {
  it('returns all books', async () => {
    const response = await request(expressApp)
      .get('/api/v1/books')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('length');
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });
});
