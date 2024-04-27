import { MigrationInterface, QueryRunner } from 'typeorm';

export class LibraryMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('LibraryDB', false);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('LibraryDB', true);
  }
}
