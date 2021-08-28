import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterUserAvatar1617278234674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    const hasAvatar = table?.findColumnByName('avatar');

    if (!hasAvatar) {
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'avatar',
          type: 'varchar',
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
