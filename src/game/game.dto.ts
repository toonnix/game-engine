import { ApiProperty } from '@nestjs/swagger';
import { GameEntity } from 'src/game/game.entity';
import { IsArray } from 'class-validator';
import { Generated } from 'typeorm';
import { MissionStatus, LocationStatus } from 'src/game/game.entity';
import { PlayerEntity } from 'src/player/player.entity';
import { UserStatusEntity } from 'src/entity/user-status.entity';

export class GameDTO implements Readonly<GameDTO> {
  @ApiProperty({ type: 'string' })
  @Generated('uuid')
  gameId: string;

  @ApiProperty({ type: 'string' })
  villainCode: string;

  @ApiProperty({ type: 'integer' })
  villainHealth: number;

  @ApiProperty({ type: MissionStatus })
  threatMission: MissionStatus;

  @ApiProperty({ type: MissionStatus })
  thugMission: MissionStatus;

  @ApiProperty({ type: MissionStatus })
  civillianMission: MissionStatus;

  @ApiProperty({ type: 'integer', default: 0 })
  missionAcquired: number;

  @ApiProperty({ type: [LocationStatus] })
  @IsArray()
  location: LocationStatus[];

  @ApiProperty({ type: [String] })
  cardInTimeLine: string[];

  @ApiProperty({ type: PlayerEntity, isArray: true })
  players: PlayerEntity[];

  @ApiProperty({ type: UserStatusEntity, isArray: true })
  users: UserStatusEntity[];

  public static from(dto: Partial<GameDTO>) {
    const game = new GameDTO();
    game.villainCode = dto.villainCode;
    game.villainHealth = dto.villainHealth;
    game.threatMission = dto.threatMission;
    game.thugMission = dto.thugMission;
    game.civillianMission = dto.civillianMission;
    game.missionAcquired = dto.missionAcquired;
    game.location = dto.location;
    game.cardInTimeLine = dto.cardInTimeLine;
    game.players = dto.players;
    game.users = dto.users;
    return game;
  }

  public static fromEntity(entity: GameEntity) {
    return this.from({
      villainCode: entity.villainCode,
      villainHealth: entity.villainHealth,
      threatMission: entity.threatMission,
      thugMission: entity.thugMission,
      civillianMission: entity.civillianMission,
      missionAcquired: entity.missionAcquired,
      location: entity.location,
      cardInTimeLine: entity.cardInTimeLine,
      players: entity.players,
      users: entity.users
    });
  }

  public toEntity(this: GameDTO) {
    const game = new GameEntity();
    game.villainCode = this.villainCode;
    game.villainHealth = this.villainHealth;
    game.threatMission = this.threatMission;
    game.thugMission = this.thugMission;
    game.civillianMission = this.civillianMission;
    game.missionAcquired = this.missionAcquired;
    game.location = this.location;
    game.cardInTimeLine = this.cardInTimeLine;
    game.players = this.players;
    game.users = this.users;
    game.createDateTime = new Date();
    return game;
  }
}
