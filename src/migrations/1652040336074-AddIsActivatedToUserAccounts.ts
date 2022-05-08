import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActivatedToUserAccounts1652040336074
  implements MigrationInterface
{
  name = 'AddIsActivatedToUserAccounts1652040336074';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipment" ADD "status" character varying NOT NULL DEFAULT 'MANIFEST'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_accounts" ADD "is_activated" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_accounts" DROP COLUMN "is_activated"`,
    );
    await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "status"`);
  }
}
