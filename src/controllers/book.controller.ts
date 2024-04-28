import { Request, Response, NextFunction } from 'express';
import { Book } from '../entity';
import * as BookService from '../services/book.service';
import { BookNotFoundError } from '../errors/book.error';

export async function findAllBooks(req: Request, res: Response<Book[]>, next: NextFunction) {
  try {
    const books: Book[] = await BookService.findAllBooks();
    res.send(books);
  } catch (error) {
    next(error);
  }
}

export async function findBookById(req: Request<{ id: string }, Book, unknown>, res: Response<Book>, next: NextFunction) {
  try {
    const { id } = req.params;
    const book = await BookService.findBookById(+id);
    if (!book) {
      res.status(404);
      throw new BookNotFoundError(`Book with id ${req.params.id} not found.`);
    }
    res.status(200).send(book);
  } catch (error) {
    next(error);
  }
}

export async function createBook(req: Request<{ name: string }>, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;
    await BookService.createBook(name);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
}
