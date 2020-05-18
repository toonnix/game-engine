import {MigrationInterface, QueryRunner} from "typeorm";

export class init1589792645299 implements MigrationInterface {
    name = 'init1589792645299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modifyDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userName" character varying NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "userStatus_userstatus_enum" AS ENUM('AVAILABLE', 'PLAYING')`, undefined);
        await queryRunner.query(`CREATE TABLE "userStatus" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modifyDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" integer NOT NULL, "userStatus" "userStatus_userstatus_enum" NOT NULL DEFAULT 'AVAILABLE', "gameId" integer, "gameGameId" uuid, CONSTRAINT "PK_530692e8931b1e63ec3bfcd1235" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "game_locationtokenneed_enum" AS ENUM('ATTACK', 'MOVE', 'HEROIC_ACTIOM', 'WILD_CARD')`, undefined);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modifyDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "gameId" uuid NOT NULL DEFAULT uuid_generate_v4(), "villainCode" character varying NOT NULL, "villainHealth" integer NOT NULL, "missionAcquired" integer NOT NULL DEFAULT 0, "cardInTimeLine" character varying array NOT NULL, "threatMissionGoal" integer NOT NULL, "threatMissionAcquired" integer NOT NULL, "thugMissionGoal" integer NOT NULL, "thugMissionAcquired" integer NOT NULL, "civillianMissionGoal" integer NOT NULL, "civillianMissionAcquired" integer NOT NULL, "locationLocationcode" character varying NOT NULL, "locationClearstatus" boolean NOT NULL, "locationThreatcode" character varying NOT NULL, "locationTokenneed" "game_locationtokenneed_enum" NOT NULL, "locationTokenacquired" integer NOT NULL, CONSTRAINT "PK_e3b127d0257bec5a74c3964d6b4" PRIMARY KEY ("id", "gameId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "modifyDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "playerHash" uuid NOT NULL DEFAULT uuid_generate_v4(), "heroCode" character varying NOT NULL, "cardInHand" character varying array NOT NULL, "cardInTimeLine" character varying array NOT NULL, "userStatusId" integer, "gameId" integer, "gameGameId" uuid, "tokenInHandAttack" integer NOT NULL, "tokenInHandMove" integer NOT NULL, "tokenInHandHeroic_action" integer NOT NULL, "tokenInHandWild_card" integer NOT NULL, CONSTRAINT "REL_ee3911cb869edf151ce5194c5c" UNIQUE ("userStatusId"), CONSTRAINT "PK_0e00c4041ab1a78642ca5f399df" PRIMARY KEY ("id", "playerHash"))`, undefined);
        await queryRunner.query(`ALTER TABLE "userStatus" ADD CONSTRAINT "FK_345049caae831a236348bced0f0" FOREIGN KEY ("gameId", "gameGameId") REFERENCES "game"("id","gameId") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_ee3911cb869edf151ce5194c5cf" FOREIGN KEY ("userStatusId") REFERENCES "userStatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_2b9d6b7f5c73fc4016178fc9a47" FOREIGN KEY ("gameId", "gameGameId") REFERENCES "game"("id","gameId") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_2b9d6b7f5c73fc4016178fc9a47"`, undefined);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_ee3911cb869edf151ce5194c5cf"`, undefined);
        await queryRunner.query(`ALTER TABLE "userStatus" DROP CONSTRAINT "FK_345049caae831a236348bced0f0"`, undefined);
        await queryRunner.query(`DROP TABLE "player"`, undefined);
        await queryRunner.query(`DROP TABLE "game"`, undefined);
        await queryRunner.query(`DROP TYPE "game_locationtokenneed_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "userStatus"`, undefined);
        await queryRunner.query(`DROP TYPE "userStatus_userstatus_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
