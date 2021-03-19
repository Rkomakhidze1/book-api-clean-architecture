import {MigrationInterface, QueryRunner} from "typeorm";

export class bookAuthorAssossiation1615111244374 implements MigrationInterface {
    name = 'bookAuthorAssossiation1615111244374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "authorId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "authorId"
        `);
    }

}
