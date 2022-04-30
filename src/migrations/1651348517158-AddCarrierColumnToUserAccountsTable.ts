import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCarrierColumnToUserAccountsTable1651348517158
  implements MigrationInterface
{
  name = 'AddCarrierColumnToUserAccountsTable1651348517158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_accounts" ADD "carrier" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_accounts" DROP COLUMN "carrier"`,
    );
  }
}
