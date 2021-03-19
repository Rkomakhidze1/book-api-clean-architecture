import {MigrationInterface, QueryRunner} from "typeorm";

export class createBookTable1615107567082 implements MigrationInterface {
    name = 'createBookTable1615107567082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "pages" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
