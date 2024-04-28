import { AppDataSource } from '../database/dataSource';

import { Book } from '../entity';

const bookRepository = AppDataSource.getRepository(Book);

export async function findAllBooks() {
  const users = await bookRepository.find({ select: { id: true, name: true } });
  return users;
}

export async function createBook(name: string) {
  await bookRepository.insert({ name });
}
