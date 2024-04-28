import request from 'supertest';
import expressApp from '../../../../src/loaders/expressApp';

import { AppDataSource } from '../../../../src/database/dataSource';
import { User } from '../../../../src/entity';
import { Not } from 'typeorm';

describe('GET /api/v1/users', () => {
  it('responds returns all users', async () => {
    const response = await request(expressApp)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('length');
    expect(response.body.length).toBeGreaterThanOrEqual(0);
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
  const userRepository = AppDataSource.getRepository(User);

  it('responds finds user by given user id and returns it', async () => {
    const user = await userRepository.findOne({ where: { name: Not('') } });
    expect(user).toHaveProperty('id');
    const response = await request(expressApp)
      .get(`/api/v1/users/${user?.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(user?.id);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('books');
    expect(response.body.books).toHaveProperty('past');
    expect(response.body.books).toHaveProperty('present');
  });

  it('responds with 404(Not found) if user with given id does not exist in db', async () => {
    await request(expressApp).get(`/api/v1/users/10000000`).set('Accept', 'application/json').expect(404);
  });
});
