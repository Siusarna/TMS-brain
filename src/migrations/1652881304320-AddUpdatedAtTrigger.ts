import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedAtTrigger1652881304320 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON "shipment"
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
    await queryRunner.query(`
            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON "item"
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
    await queryRunner.query(`
            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON "address"
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
    await queryRunner.query(`
            CREATE TRIGGER set_timestamp
            BEFORE UPDATE ON "document"
            FOR EACH ROW
            EXECUTE PROCEDURE trigger_set_timestamp();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TRIGGER set_timestamp
            ON document
        `);
    await queryRunner.query(`
            DROP TRIGGER set_timestamp
            ON address
        `);
    await queryRunner.query(`
            DROP TRIGGER set_timestamp
            ON item
        `);
    await queryRunner.query(`
            DROP TRIGGER set_timestamp
            ON shipment
        `);
  }
}
