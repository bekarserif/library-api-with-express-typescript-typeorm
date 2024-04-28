import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class BookMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book',
        columns: [
          { name: 'id', type: 'INTEGER', isPrimary: true, isGenerated: true, generationStrategy: 'rowid' },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'score', type: 'integer', default: -1 },
          { name: 'presentUserId', type: 'INTEGER', isNullable: true },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
      true
    );
    await queryRunner.createForeignKey(
      'book',
      new TableForeignKey({
        columnNames: ['presentUserId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('book', 'presentUserId');
    await queryRunner.dropTable('book');
  }
}
