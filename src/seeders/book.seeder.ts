import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Book } from '../entity';

export class BookSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Book);
    await repository.clear();
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
