import env from '../env';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
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
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
  seeds: [UserSeeder, BookSeeder],
  seedTracking: true,
  synchronize: NODE_ENV === 'development',
};

export const AppDataSource = new DataSource(dataSourceOptions);
