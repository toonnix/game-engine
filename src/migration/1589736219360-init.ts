import {MigrationInterface, QueryRunner} from "typeorm";

export class init1589736219360 implements MigrationInterface {
    name = 'init1589736219360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "game_locationtokenneed_enum" AS ENUM('ATTACK', 'MOVE', 'HEROIC_ACTIOM', 'WILD_CARD')`, undefined);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modifyDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "gameHash" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerHash" uuid array NOT NULL, "villainCode" character varying NOT NULL, "villainHealth" integer NOT NULL, "missionAcquired" integer NOT NULL DEFAULT 0, "cardInTimeLine" character varying array NOT NULL, "threatMissionGoal" integer NOT NULL, "threatMissionAcquired" integer NOT NULL, "thugMissionGoal" integer NOT NULL, "thugMissionAcquired" integer NOT NULL, "civillianMissionGoal" integer NOT NULL, "civillianMissionAcquired" integer NOT NULL, "locationLocationcode" character varying NOT NULL, "locationClearstatus" boolean NOT NULL, "locationThreatcode" character varying NOT NULL, "locationTokenneed" "game_locationtokenneed_enum" NOT NULL, "locationTokenacquired" integer NOT NULL, CONSTRAINT "PK_735c96a611ea8430a5cf6532bc7" PRIMARY KEY ("id", "gameHash"))`, undefined);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modifyDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "playerHash" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "gameHash" uuid NOT NULL, "heroCode" character varying NOT NULL, "cardInHand" character varying array NOT NULL, "cardInTimeLine" character varying array NOT NULL, "tokenInHandAttack" integer NOT NULL, "tokenInHandMove" integer NOT NULL, "tokenInHandHeroic_action" integer NOT NULL, "tokenInHandWild_card" integer NOT NULL, CONSTRAINT "PK_0e00c4041ab1a78642ca5f399df" PRIMARY KEY ("id", "playerHash"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modifyDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userName" character varying NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "player"`, undefined);
        await queryRunner.query(`DROP TABLE "game"`, undefined);
        await queryRunner.query(`DROP TYPE "game_locationtokenneed_enum"`, undefined);
    }

}
