import request from 'supertest';
import expressApp from '../../../../src/loaders/expressApp';

import { AppDataSource } from '../../../../src/database/dataSource';
import { Book, User } from '../../../../src/entity';
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

describe('POST /api/v1/users/:userId/borrow/:bookId', () => {
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);

  it('responds with 204 and changes books current user to given user', async () => {
    const user = await userRepository.findOne({ where: { name: Not('') } });
    const book = await bookRepository
      .createQueryBuilder('book')
      .leftJoin('book.presentUser', 'presentUser')
      .where('presentUser.id IS NULL')
      .getOne();
    expect(user).toHaveProperty('id');
    expect(book).toHaveProperty('id');
    await request(expressApp).get(`/api/v1/users/${user?.id}/borrow/${book?.id}`).set('Accept', 'application/json').expect(204);
  });

  it('responds with 404 if given user not found', async () => {
    const book = await bookRepository
      .createQueryBuilder('book')
      .leftJoin('book.presentUser', 'presentUser')
      .where('presentUser.id IS NULL')
      .getOne();
    expect(book).toHaveProperty('id');
    await request(expressApp).get(`/api/v1/users/1000000/borrow/${book?.id}`).set('Accept', 'application/json').expect(404);
  });

  it('responds with 404 if given book is not found or has a current user', async () => {
    const user = await userRepository.findOne({ where: { name: Not('') } });

    await request(expressApp).get(`/api/v1/users/${user?.id}/borrow/10000000`).set('Accept', 'application/json').expect(404);
  });

  it('responds with 422(Invalid data) if userId param is not correct type', async () => {
    await request(expressApp).get(`/api/v1/users/test/borrow/10000000`).set('Accept', 'application/json').expect(422);
  });

  it('responds with 422(Invalid data) if bookId param is not correct type', async () => {
    await request(expressApp).get(`/api/v1/users/1/borrow/test`).set('Accept', 'application/json').expect(422);
  });
});
