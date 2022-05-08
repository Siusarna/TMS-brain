import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddShipmentsTables1652013145396 implements MigrationInterface {
  name = 'AddShipmentsTables1652013145396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "company" character varying, "address1" character varying NOT NULL, "municipality" character varying NOT NULL, "state_or_province" character varying NOT NULL, "country" character varying NOT NULL, "postal_code" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "hts_code" character varying NOT NULL, "hts_description" character varying NOT NULL, "cost" integer NOT NULL, "country_of_manufacture" character varying NOT NULL, "weight" integer NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "length" integer NOT NULL, "weight_units" character varying NOT NULL, "dimension_units" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "shipment_id" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document" ("id" SERIAL NOT NULL, "document_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "shipment_id" integer, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipment" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "carrier" character varying NOT NULL, "carrier_response" jsonb NOT NULL, "tracking_number" character varying NOT NULL, "service_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL, "from_id" integer, "to_id" integer, CONSTRAINT "PK_f51f635db95c534ca206bf7a0a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_5368572fb456e40b1492a3e2d80" FOREIGN KEY ("shipment_id") REFERENCES "shipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_c496e6b0fe36d490516ba1bbd8b" FOREIGN KEY ("shipment_id") REFERENCES "shipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment" ADD CONSTRAINT "FK_12ed3d94f5eaedb2965cee6d410" FOREIGN KEY ("from_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment" ADD CONSTRAINT "FK_1ae99ea146f7d98611a9ce78604" FOREIGN KEY ("to_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shipment" DROP CONSTRAINT "FK_1ae99ea146f7d98611a9ce78604"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shipment" DROP CONSTRAINT "FK_12ed3d94f5eaedb2965cee6d410"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_c496e6b0fe36d490516ba1bbd8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_5368572fb456e40b1492a3e2d80"`,
    );
    await queryRunner.query(`DROP TABLE "shipment"`);
    await queryRunner.query(`DROP TABLE "document"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
