import {MigrationInterface, QueryRunner} from "typeorm";

export class init1636637460225 implements MigrationInterface {
    name = 'init1636637460225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "market" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "market_id" integer NOT NULL, "creator" character varying NOT NULL, "creation" character varying NOT NULL, "oracle" character varying NOT NULL, "slug" character varying, "question" character varying, "description" character varying, "market_type" jsonb NOT NULL, "period" jsonb NOT NULL, "scoring_rule" character varying NOT NULL, "status" character varying NOT NULL, "report" jsonb, "resolved_outcome" character varying, "mdm" jsonb NOT NULL, CONSTRAINT "PK_1e9a2963edfd331d92018e3abac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "market_history" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "market_id" character varying NOT NULL, "event" character varying NOT NULL, "status" character varying, "report" jsonb, "resolved_outcome" character varying, "block_number" integer NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_be6923fa617384eeb8cc8ca3d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pool" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "pool_id" integer NOT NULL, "base_asset" character varying NOT NULL, "market_id" integer NOT NULL, "pool_status" character varying NOT NULL, "scoring_rule" character varying NOT NULL, "swap_fee" character varying NOT NULL, "total_subsidy" character varying NOT NULL, "total_weight" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" numeric NOT NULL, CONSTRAINT "PK_db1bfe411e1516c01120b85f8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "market_history" ADD CONSTRAINT "FK_81e36721ba635cf08f409523d2c" FOREIGN KEY ("market_id") REFERENCES "market"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "market_history" DROP CONSTRAINT "FK_81e36721ba635cf08f409523d2c"`);
        await queryRunner.query(`DROP TABLE "pool"`);
        await queryRunner.query(`DROP TABLE "market_history"`);
        await queryRunner.query(`DROP TABLE "market"`);
    }

}