import { AppDataSource } from '../database/dataSource';

import { User } from '../entity';

const userRepository = AppDataSource.getRepository(User);

export async function findAllUsers() {
  const users = await userRepository.find();
  return users;
}

export async function findUserById(id: number) {
  const user = await userRepository.findOne({ where: { id } });
  return user;
}

export async function createUser(name: string) {
  await userRepository.insert({ name });
}
