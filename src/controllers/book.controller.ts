import { Request, Response, NextFunction } from 'express';
import { Book } from '../entity';

export async function findAllBooks(req: Request, res: Response<Book[]>, next: NextFunction) {
  try {
    const books: Book[] = [];
    res.send(books);
  } catch (error) {
    next(error);
  }
}
