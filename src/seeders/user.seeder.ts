import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

export class UserSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);

    await repository.insert([
      {
        name: 'Eray Aslan',
      },
      {
        name: 'Enes Faruk Meniz',
      },
      {
        name: 'Kadir Mutlu',
      },
      {
        name: 'Sefa Eren Şahin',
      },
    ]);
  }
}
