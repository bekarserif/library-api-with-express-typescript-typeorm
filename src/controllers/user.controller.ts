import { Request, Response } from 'express';
import { User } from '../entity/user.entity';

export async function findAllUsers(req: Request, res: Response<User[] | string>) {
  try {
    const users: User[] = [];
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
