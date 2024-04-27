import { AppDataSource } from '../src/database/dataSource';
import { runSeeders } from 'typeorm-extension';

global.beforeAll(async () => {
  await AppDataSource.initialize();
  await runSeeders(AppDataSource);
});

global.afterAll(async () => {
  await AppDataSource.destroy();
});
