import request from 'supertest';

import expressApp from '../../../../src/loaders/expressApp';

describe('/api/v1/users', () => {
  it('responds returns all users', async () => {
    const response = await request(expressApp)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('length');
    expect(response.body.length).toBe(0);
  });
});

describe('/api/v1/users/:id', () => {
  const userId = 2;
  it('responds finds user by given user id and returns it', async () => {
    const response = await request(expressApp)
      .get(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty('content');
    expect(response.body.name).toBe('Serif');
  });
});
