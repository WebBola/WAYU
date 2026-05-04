import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777529802823 implements MigrationInterface {
    name = 'Wayu1777529802823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "countries" DROP COLUMN "flag"`);
        await queryRunner.query(`ALTER TABLE "countries" ADD "flag" character varying(128) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "countries" DROP COLUMN "flag"`);
        await queryRunner.query(`ALTER TABLE "countries" ADD "flag" character varying(128) NOT NULL`);
    }

}
