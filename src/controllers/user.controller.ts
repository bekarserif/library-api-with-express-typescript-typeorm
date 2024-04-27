import { Request, Response } from 'express';
import { User } from '../entity/user.entity';

export async function findAllUsers(req: Request, res: Response<User[] | string>) {
  try {
    const users: User[] = [];
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

export async function findUserById(req: Request, res: Response<User | string>) {
  try {
    const user: User = {
      id: '2',
      name: 'Enes Faruk Meniz',
      created_at: new Date(),
      updated_at: new Date(),
    };

    res.send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
