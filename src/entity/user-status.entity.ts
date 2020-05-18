import { Entity, Column, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PlayerEntity } from '../player/player.entity';
import { GameEntity } from '../game/game.entity';

export enum UserStatusEnum {
  AVAILABLE = 'AVAILABLE',
  PLAYING = 'PLAYING'
}

@Entity({ name: 'userStatus' })
export class UserStatusEntity extends BaseEntity {
  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.AVAILABLE })
  userStatus: UserStatusEnum;

  @OneToOne(type => PlayerEntity)
  player: PlayerEntity;

  @ManyToOne(type => GameEntity, game => game.users)
  game: GameEntity;
}
