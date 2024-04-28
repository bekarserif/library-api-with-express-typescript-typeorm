import { Request, Response } from 'express';
import { Book } from '../entity';

export async function findAllBooks(req: Request, res: Response<Book[] | string>) {
  try {
    const books: Book[] = [];
    res.send(books);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
