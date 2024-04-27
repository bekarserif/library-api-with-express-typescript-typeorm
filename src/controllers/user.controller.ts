import { Request, Response } from 'express';
import UserResponse from '../interfaces/userResponse';

export async function findAllUsers(req: Request, res: Response<UserResponse[] | string>) {
  try {
    const users: UserResponse[] = [];
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
