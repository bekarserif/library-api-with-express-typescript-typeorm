import { AppDataSource } from '../database/dataSource';

import { Book } from '../entity';

const bookRepository = AppDataSource.getRepository(Book);

export async function findAllBooks() {
  const books = await bookRepository.find({ select: { id: true, name: true } });
  return books;
}

export async function createBook(name: string) {
  await bookRepository.insert({ name });
}

export async function findBookById(id: number) {
  const book = await bookRepository.findOne({ where: { id } });
  return book;
}
