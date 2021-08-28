import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarImages1618678897762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_image',
        columns: [
          {
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'image_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_car_image',
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_image');
  }
}
