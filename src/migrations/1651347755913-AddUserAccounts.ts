import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAccounts1651347755913 implements MigrationInterface {
  name = 'AddUserAccounts1651347755913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION trigger_set_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
    await queryRunner.query(
      `CREATE TABLE "user_accounts" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "login" character varying, "password" character varying, "token" character varying, "licence_number" character varying, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_125e915cf23ad1cfb43815ce59b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`
            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON "user_accounts"
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_accounts"`);
    await queryRunner.query(`DROP FUNCTION trigger_set_timestamp`);
  }
}
