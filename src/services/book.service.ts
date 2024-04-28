import { AppDataSource } from '../database/dataSource';

import { Book, User, UserBookPast } from '../entity';
import { BookNotFoundError } from '../errors/book.error';

const bookRepository = AppDataSource.getRepository(Book);
const userBookPastRepository = AppDataSource.getRepository(UserBookPast);

export async function findAllBooks() {
  const books = await bookRepository.find({ select: { id: true, name: true } });
  return books;
}

export async function createBook(name: string) {
  await bookRepository.insert({ name });
}

export async function findBookById(id: number) {
  const book = await bookRepository.findOne({ select: { id: true, name: true, score: true }, where: { id } });
  if (!book) {
    throw new BookNotFoundError(`Book with id ${id} not found.`);
  }
  return book;
}

export async function findBookNoPresentUserByBookId(id: number) {
  const book = await bookRepository
    .createQueryBuilder('book')
    .leftJoin('book.presentUser', 'presentUser')
    .where('book.id = :id', { id })
    .andWhere('presentUser.id IS NULL')
    .getOne();
  if (!book) {
    throw new BookNotFoundError(`Book with id ${id} not found. Or currently belongs to another user`);
  }
  return book;
}

export async function findBookWithPresentUserByBookId(bookId: number, userId: number) {
  const book = await bookRepository
    .createQueryBuilder('book')
    .leftJoin('book.presentUser', 'presentUser')
    .where('book.id = :bookId', { bookId })
    .andWhere('presentUser.id = :userId', { userId })
    .getOne();
  if (!book) {
    throw new BookNotFoundError(`Book with id ${bookId} not found. Or currently belongs to another user`);
  }
  return book;
}

export async function borrowBook(user: User, bookId: number) {
  await bookRepository.createQueryBuilder().update(Book).set({ presentUser: user }).where('id = :id', { id: bookId }).execute();
}

export async function returnBook(user: User, book: Book, userScore: number) {
  await bookRepository.createQueryBuilder().update(Book).set({ presentUser: null }).where('id = :id', { id: book.id }).execute();
  await userBookPastRepository.insert({
    pastScore: userScore,
    pastBook: book,
    pastUser: user,
  });
}
