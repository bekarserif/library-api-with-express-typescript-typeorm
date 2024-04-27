import env from '../env';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from '../entity';
import { LibraryMigration, UserMigration } from '../migration';
import { UserSeeder } from '../seeders';

const { HOST, USER, PASS, DB_DATABASE } = env.DB;
const { NODE_ENV } = env.APP;

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: HOST,
  port: 5432,
  username: USER,
  password: PASS,
  database: DB_DATABASE,
  entities: [User],
  migrations: [LibraryMigration, UserMigration],
  seeds: [UserSeeder],
  seedTracking: true,
  synchronize: NODE_ENV === 'development',
};

export const AppDataSource = new DataSource(dataSourceOptions);
