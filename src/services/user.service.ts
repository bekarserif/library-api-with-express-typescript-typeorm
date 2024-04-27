import { AppDataSource } from '../database/dataSource';

import { User } from '../entity';

const userRepository = AppDataSource.getRepository(User);

export async function findAllUsers() {
  const users = await userRepository.find();
  return users;
}
