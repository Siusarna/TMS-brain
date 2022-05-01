import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueIndexToUserAccountsTable1651394922095
  implements MigrationInterface
{
  name = 'AddUniqueIndexToUserAccountsTable1651394922095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_de5bbe6e9d0b4734f515ee7acd" ON "user_accounts" ("user_id", "carrier") WHERE is_deleted = false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_de5bbe6e9d0b4734f515ee7acd"`,
    );
  }
}
