import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserBookHistoryMigration1714337141982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_book_history (
      id SERIAL PRIMARY KEY,
      pastUserId INTEGER,
      pastBookId INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (pastUserId) REFERENCES "user" (id) ON DELETE CASCADE,
      FOREIGN KEY (pastBookId) REFERENCES book (id) ON DELETE CASCADE
  );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_book_history;`);
  }
}
