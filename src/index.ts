import env from './env';
import expressApp from './loaders/expressApp';
import { AppDataSource } from './database/dataSource';
import { runSeeders } from 'typeorm-extension';
import 'reflect-metadata';
const { PORT, NODE_ENV } = env.APP;

async function bootstrapApp() {
  await AppDataSource.initialize();
  if (NODE_ENV === 'development') {
    await runSeeders(AppDataSource);
  }
  expressApp.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

bootstrapApp();
