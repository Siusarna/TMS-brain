import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddShipmentNumberColumn1651995325464
  implements MigrationInterface
{
  name = 'AddShipmentNumberColumn1651995325464';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_accounts" ADD "shipment_number" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_accounts" DROP COLUMN "shipment_number"`,
    );
  }
}
