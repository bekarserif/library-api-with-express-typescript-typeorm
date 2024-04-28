import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Book } from '../entity';
import env from '../env';

export class BookSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    if (env.APP.NODE_ENV === 'development') {
      const repository = dataSource.getRepository(Book);
      await repository.delete({});
      await repository.insert([
        {
          name: '1984',
        },
        {
          name: 'Brave New World',
        },
        {
          name: 'Dune',
        },
        {
          name: 'I, Robot',
        },
        {
          name: "The Hitchhiker's Guide to the Galaxy",
        },
      ]);
    }
  }
}
