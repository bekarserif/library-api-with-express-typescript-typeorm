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

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

export async function createUser(req: Request<{ name: string }>, res: Response) {
  try {
    const { name } = req.body;
    if (name) {
      return res.status(201).send();
    }
    throw new Error('Validation Error');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
