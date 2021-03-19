import {MigrationInterface, QueryRunner} from "typeorm";

export class createAuthorTable1615108365002 implements MigrationInterface {
    name = 'createAuthorTable1615108365002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "author" (
                "id" SERIAL NOT NULL,
                "full_name" character varying(100) NOT NULL,
                "username" character varying(50) NOT NULL,
                "password" character varying(100) NOT NULL,
                CONSTRAINT "UQ_a988fd4b843d3e8c74fbc8672f3" UNIQUE ("username"),
                CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "author"
        `);
    }

}
