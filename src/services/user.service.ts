import { AppDataSource } from '../database/dataSource';

import { User } from '../entity';
import { UserNotFoundError } from '../errors/user.error';

const userRepository = AppDataSource.getRepository(User);

export async function findAllUsers() {
  const users = await userRepository.find({ select: { id: true, name: true } });
  return users;
}

export async function findUserById(id: number) {
  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.pastUserBooks', 'pastUserBook')
    .leftJoinAndSelect('pastUserBook.pastBook', 'pastBook')
    .leftJoinAndSelect('user.presentUserBooks', 'presentBook')
    .where('user.id = :userId', { userId: id })
    .getOne();
  if (!user) {
    throw new UserNotFoundError(`User with id ${id} not found.`);
  }
  return user;
}

export async function createUser(name: string) {
  await userRepository.insert({ name });
}
