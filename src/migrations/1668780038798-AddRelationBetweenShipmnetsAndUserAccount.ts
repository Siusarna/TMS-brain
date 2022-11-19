import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationBetweenShipmnetsAndUserAccount1668780038798 implements MigrationInterface {
    name = 'AddRelationBetweenShipmnetsAndUserAccount1668780038798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipment" ADD COLUMN "user_account_id" integer NOT NULL CONSTRAINT fk_shipment_user_accounts REFERENCES user_accounts (id)`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipment" ADD COLUMN "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipment" DROP COLUMN "user_account_id"`);
    }

}
