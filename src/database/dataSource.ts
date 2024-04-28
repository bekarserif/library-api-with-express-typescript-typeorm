import env from '../env';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User, Book } from '../entity';
import { BookMigration, LibraryMigration, UserMigration } from '../migration';
import { BookSeeder, UserSeeder } from '../seeders';

const { HOST, USER, PASS, DB_DATABASE } = env.DB;
const { NODE_ENV } = env.APP;

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: HOST,
  port: 5432,
  username: USER,
  password: PASS,
  database: DB_DATABASE,
  entities: [User, Book],
  migrations: [LibraryMigration, UserMigration, BookMigration],
  seeds: [UserSeeder, BookSeeder],
  seedTracking: true,
  synchronize: NODE_ENV === 'development',
};

export const AppDataSource = new DataSource(dataSourceOptions);
