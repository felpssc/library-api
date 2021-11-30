import {
  MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey,
} from 'typeorm';

export class CreateBooks1636660496927 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'categories',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'published_year',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.addColumn('books', new TableColumn({
      name: 'author_id',
      type: 'uuid',
    }));

    await queryRunner.addColumn('books', new TableColumn({
      name: 'category_id',
      type: 'uuid',
    }));

    await queryRunner.createForeignKey('books', new TableForeignKey({
      columnNames: ['author_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'authors',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('books', new TableForeignKey({
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('books', 'category_id');
    await queryRunner.dropColumn('books', 'category_id');
    await queryRunner.dropForeignKey('books', 'author_id');
    await queryRunner.dropColumn('books', 'author_id');
    await queryRunner.dropTable('books');
  }
}
