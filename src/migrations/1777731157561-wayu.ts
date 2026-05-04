import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777731157561 implements MigrationInterface {
    name = 'Wayu1777731157561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_tags" ("newsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_729533afcb9b8c022a528071750" PRIMARY KEY ("newsId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_582fa57d7772a6b79efdaa4e53" ON "news_tags" ("newsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_38708534ec4c251fd2c10d302c" ON "news_tags" ("tagId") `);
        
        await queryRunner.query(`ALTER TABLE "news" ADD "countryId" integer`);

        await queryRunner.query(`ALTER TABLE "news" ADD "date" date NOT NULL DEFAULT CURRENT_DATE`);
        
        await queryRunner.query(`ALTER TABLE "news" ADD "content" text NOT NULL DEFAULT ''`);

        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "content" DROP DEFAULT`);

        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_81498edd9eaa443973b3f8f655f" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_tags" ADD CONSTRAINT "FK_582fa57d7772a6b79efdaa4e538" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "news_tags" ADD CONSTRAINT "FK_38708534ec4c251fd2c10d302c5" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_tags" DROP CONSTRAINT "FK_38708534ec4c251fd2c10d302c5"`);
        await queryRunner.query(`ALTER TABLE "news_tags" DROP CONSTRAINT "FK_582fa57d7772a6b79efdaa4e538"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_81498edd9eaa443973b3f8f655f"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "countryId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38708534ec4c251fd2c10d302c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_582fa57d7772a6b79efdaa4e53"`);
        await queryRunner.query(`DROP TABLE "news_tags"`);
    }
}