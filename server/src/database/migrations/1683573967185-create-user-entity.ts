import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserEntity1683573967185 implements MigrationInterface {
    name = 'createUserEntity1683573967185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "rento"."users_role_enum" AS ENUM('admin', 'member', 'provider')`);
        await queryRunner.query(`CREATE TABLE "rento"."users" (
            "user_id" SERIAL NOT NULL, 
            "first_name" character varying(30) NOT NULL, 
            "last_name" character varying(30) NOT NULL, 
            "display_name" character varying(30) NOT NULL, 
            "role" "rento"."users_role_enum" NOT NULL DEFAULT 'member', 
            "email" character varying(255), "phone_number" character varying(15), 
            "password" character varying(255) NOT NULL, 
            "refresh_token" text, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "user_unique_display_name" UNIQUE ("display_name"), 
            CONSTRAINT "user_unique_phone_number" UNIQUE ("phone_number"), 
            CONSTRAINT "user_unique_email" UNIQUE ("email"), 
            CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE INDEX "user_phone_number_index" ON "rento"."users" ("phone_number") `);
        await queryRunner.query(`CREATE INDEX "user_email_index" ON "rento"."users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "rento"."user_email_index"`);
        await queryRunner.query(`DROP INDEX "rento"."user_phone_number_index"`);
        await queryRunner.query(`DROP TABLE "rento"."users"`);
        await queryRunner.query(`DROP TYPE "rento"."users_role_enum"`);
    }

}
