import { Request, Response, NextFunction } from 'express';
import { Book } from '../entity';
import * as BookService from '../services/book.service';
import { NotFoundError } from '../errors/globalTypes';

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

    res.status(200).send(book);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status);
    }
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
