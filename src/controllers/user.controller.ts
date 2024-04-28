import { Request, Response } from 'express';
import { User } from '../entity/user.entity';
import * as UserService from '../services/user.service';
import { UserNotFoundError } from '../errors/user.error';

export async function findAllUsers(req: Request, res: Response<User[] | string>) {
  try {
    const users: User[] = await UserService.findAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

export async function findUserById(req: Request<{ id: string }, User, unknown>, res: Response<User | string>) {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(+id);
    if (!user) {
      res.status(404);
      throw new UserNotFoundError(`User with id ${req.params.id} not found.`);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

export async function createUser(req: Request<{ name: string }>, res: Response) {
  try {
    const { name } = req.body;
    await UserService.createUser(name);
    res.status(201).send();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
