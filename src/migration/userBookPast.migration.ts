import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserBookPastTable1630000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_book_past',
        columns: [
          { name: 'id', type: 'INTEGER', isPrimary: true, isGenerated: true, generationStrategy: 'rowid' },
          { name: 'pastUserId', type: 'INTEGER' },
          { name: 'pastBookId', type: 'INTEGER' },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
      true
    );

    await queryRunner.createForeignKeys('user_book_past', [
      new TableForeignKey({
        columnNames: ['pastUserId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['pastBookId'],
        referencedTableName: 'book',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_book_past');
    const foreignKeyUser = table?.foreignKeys.find((fk) => fk.columnNames.indexOf('pastUserId') !== -1);
    const foreignKeyBook = table?.foreignKeys.find((fk) => fk.columnNames.indexOf('pastBookId') !== -1);
    if (foreignKeyUser && foreignKeyBook) {
      await queryRunner.dropForeignKey('user_book_past', foreignKeyUser);
      await queryRunner.dropForeignKey('user_book_past', foreignKeyBook);
    }
    await queryRunner.dropTable('user_book_past');
  }
}
