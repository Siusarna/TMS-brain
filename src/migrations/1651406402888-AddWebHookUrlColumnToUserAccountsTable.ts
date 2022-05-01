import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWebHookUrlColumnToUserAccountsTable1651406402888
  implements MigrationInterface
{
  name = 'AddWebHookUrlColumnToUserAccountsTable1651406402888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_accounts" ADD "web_hook_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_accounts" DROP COLUMN "web_hook_url"`,
    );
  }
}
