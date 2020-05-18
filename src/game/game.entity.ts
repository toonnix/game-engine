import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';
import { IsArray } from 'class-validator';
import { UserStatusEnum, UserStatusEntity } from '../entity/user-status.entity';
import { PlayerEntity } from '../player/player.entity';

export enum PowerTypeEnum {
  "ATTACK" = "ATTACK",
  "MOVE" = "MOVE",
  "HEROIC_ACTIOM" = "HEROIC_ACTIOM",
  "WILD_CARD" = "WILD_CARD"
}

export class MissionStatus {
  @Column('integer')
  goal: number;

  @Column('integer')
  acquired: number;
}

export class LocationStatus {
  @Column({ type: 'varchar' })
  locationCode: string;

  @Column({ type: 'boolean' })
  clearStatus: boolean;

  @Column({ type: 'varchar' })
  threatCode: string;

  @Column({ type: 'enum', enum: PowerTypeEnum })
  tokenNeed: PowerTypeEnum;

  @Column({ type: 'integer' })
  tokenAcquired: number;
}

@Entity({ name: 'game' })
export class GameEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  gameId: string;

  @Column({ type: 'varchar' })
  villainCode: string;

  @Column('integer')
  villainHealth: number;

  @Column(type => MissionStatus)
  threatMission: MissionStatus;

  @Column(type => MissionStatus)
  thugMission: MissionStatus;

  @Column(type => MissionStatus)
  civillianMission: MissionStatus;

  @Column('integer', { default: 0 })
  missionAcquired: number;

  @Column(type => LocationStatus)
  @IsArray()
  location: LocationStatus[];

  @Column({ type: 'varchar', array: true })
  cardInTimeLine: string[];

  @OneToMany(type => PlayerEntity, player => player.game)
  players: PlayerEntity[];

  @OneToMany(type => UserStatusEntity, userStatus => userStatus.game)
  users: UserStatusEntity[];
}
