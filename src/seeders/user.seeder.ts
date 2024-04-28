import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import env from '../env';

export class UserSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    if (env.APP.NODE_ENV === 'development') {
      const repository = dataSource.getRepository(User);
      await repository.delete({});
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
}
