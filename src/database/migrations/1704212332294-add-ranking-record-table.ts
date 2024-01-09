import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRankingRecordTable1704212332294 implements MigrationInterface {
    name = 'AddRankingRecordTable1704212332294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ranking_records\` (\`id\` varchar(36) NOT NULL, \`monsterid\` varchar(255) NOT NULL, \`monstername\` varchar(255) NOT NULL, \`victories\` int NOT NULL, \`defeats\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`ranking_records\``);
    }

}
