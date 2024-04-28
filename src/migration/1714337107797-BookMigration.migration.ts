import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookMigration1714337107797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS book (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      score INTEGER DEFAULT -1,
      presentUserId INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (presentUserId) REFERENCES "user" (id) ON DELETE SET NULL
  );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE book DROP CONSTRAINT IF EXISTS presentUserId;
    DROP TABLE IF EXISTS book;`);
  }
}
