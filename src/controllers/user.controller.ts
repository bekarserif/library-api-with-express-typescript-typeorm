import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity';
import * as UserService from '../services/user.service';
import { UserNotFoundError } from '../errors/user.error';
import { Book, UserBookPast } from '../entity';
import { UserFindByIdResponse } from '../dto';

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
    if (!user) {
      res.status(404);
      throw new UserNotFoundError(`User with id ${req.params.id} not found.`);
    }
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
