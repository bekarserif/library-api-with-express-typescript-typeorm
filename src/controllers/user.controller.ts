import { Request, Response } from 'express';
import { User } from '../entity/user.entity';
import * as UserService from '../services/user.service';

export async function findAllUsers(req: Request, res: Response<User[] | string>) {
  try {
    const users: User[] = await UserService.findAllUsers();
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
    await UserService.createUser(name);
    res.status(201).send();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
