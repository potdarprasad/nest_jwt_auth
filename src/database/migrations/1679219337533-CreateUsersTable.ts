import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersTable1679219337533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table if not exists users(
                id uuid DEFAULT uuid_generate_v4() NOT NULL,
                first_name varchar,
                last_name varchar,
                email varchar unique,
                password varchar,
                refresh_token text default null,
                otp varchar(6),
                is_verified boolean default false,
                last_login_at timestamp default null,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                primary key(id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE users;
        `);
    }

}
