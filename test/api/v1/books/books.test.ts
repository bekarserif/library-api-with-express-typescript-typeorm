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

describe('POST api/v1/books', () => {
  it('creates a book', async () => {
    await request(expressApp)
      .post('/api/v1/books')
      .set('Accept', 'application/json')
      .send({
        name: 'Neuromancer',
      })
      .expect(201);
  });

  it('responds with 422(Invalid data) if name property is not given within body', async () => {
    await request(expressApp).post('/api/v1/books').set('Accept', 'application/json').expect(422);
  });

  it('responds with 422(Invalid data) if name property type is wrong', async () => {
    await request(expressApp)
      .post('/api/v1/books')
      .set('Accept', 'application/json')
      .send({
        name: 5,
      })
      .expect(422);
  });
});
