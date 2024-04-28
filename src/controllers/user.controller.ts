import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity';
import * as UserService from '../services/user.service';
import * as BookService from '../services/book.service';

import { Book, UserBookPast } from '../entity';
import { UserFindByIdResponse } from '../dto';
import { NotFoundError } from '../errors/globalTypes';

export async function findAllUsers(req: Request, res: Response<User[]>, next: NextFunction) {
  try {
    const users: User[] = await UserService.findAllUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
}

export async function findUserById(req: Request<{ id: string }, User, unknown>, res: Response<UserFindByIdResponse>, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(+id);

    const userResponse = {
      id: user.id,
      name: user.name,
      books: {
        past: user.pastUserBooks.map((pastUserBook: UserBookPast) => ({
          name: pastUserBook.pastBook.name,
          userScore: pastUserBook.pastScore,
        })),
        present: user.presentUserBooks.map((presentBook: Book) => ({
          name: presentBook.name,
        })),
      },
    };

    res.status(200).send(userResponse);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status);
    }
    next(error);
  }
}

export async function createUser(req: Request<{ name: string }>, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;
    await UserService.createUser(name);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
}

export async function borrowBookForUser(
  req: Request<{ userId: string; bookId: string }, unknown, unknown>,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, bookId } = req.params;

    const user = await UserService.findUserById(+userId);
    const book = await BookService.findBookNoPresentUserByBookId(+bookId);

    await BookService.borrowBook(user, book.id);

    res.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status);
    }
    next(error);
  }
}

export async function returnBookForUser(
  req: Request<{ userId: string; bookId: string }, unknown, { score: number }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, bookId } = req.params;

    const user = await UserService.findUserById(+userId);
    const book = await BookService.findBookWithPresentUserByBookId(+bookId, +userId);

    await BookService.returnBook(user, book, req.body.score);

    res.status(204).send();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.status);
    }
    next(error);
  }
}
