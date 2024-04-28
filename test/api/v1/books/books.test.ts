import request from 'supertest';

import expressApp from '../../../../src/loaders/expressApp';

import { Book } from '../../../../src/entity';
import { Not } from 'typeorm';
import { AppDataSource } from '../../../../src/database/dataSource';

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

describe('GET /api/v1/books/:id', () => {
  const bookRepository = AppDataSource.getRepository(Book);

  it('responds finds book by given book id and returns it', async () => {
    const book = await bookRepository.findOne({ where: { name: Not('') } });
    expect(book).toHaveProperty('id');
    const response = await request(expressApp)
      .get(`/api/v1/books/${book?.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBe(book?.id);
    expect(response.body).toHaveProperty('name');
  });

  it('responds with 404(Not found) if book with given id does not exist in db', async () => {
    await request(expressApp).get(`/api/v1/books/10000000`).set('Accept', 'application/json').expect(404);
  });
});
