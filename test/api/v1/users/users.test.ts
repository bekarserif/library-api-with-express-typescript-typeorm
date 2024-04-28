import request from 'supertest';

import expressApp from '../../../../src/loaders/expressApp';

describe('GET /api/v1/users', () => {
  it('responds returns all users', async () => {
    const response = await request(expressApp)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('length');
    expect(response.body.length).toBeGreaterThanOrEqual(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });
});

describe('POST /api/v1/users', () => {
  it('creates a user', async () => {
    await request(expressApp)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        name: 'Serif',
      })
      .expect(201);
  });

  it('responds with 422(Invalid data) if name property is not given within body', async () => {
    await request(expressApp).post('/api/v1/users').set('Accept', 'application/json').expect(422);
  });

  it('responds with 422(Invalid data) if name property type is wrong', async () => {
    await request(expressApp)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        name: 5,
      })
      .expect(422);
  });
});

describe('GET /api/v1/users/:id', () => {
  const userId = 2;
  it('responds finds user by given user id and returns it', async () => {
    const response = await request(expressApp)
      .get(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('Enes Faruk Meniz');
  });

  it('responds with 500(Internal Server Error) if user with given id does not exist in db', async () => {
    await request(expressApp).get(`/api/v1/users/10000000`).set('Accept', 'application/json').expect(500);
  });
});
