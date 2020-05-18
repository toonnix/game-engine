import { Entity, Column, OneToOne, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PlayerEntity } from '../player/player.entity';
import { GameEntity } from '../game/game.entity';

export enum UserStatusEnum {
  AVAILABLE = 'AVAILABLE',
  PLAYING = 'AVAILABLE'
}

@Entity({ name: 'userStatus' })
export class UserStatusEntity extends BaseEntity {
  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.AVAILABLE })
  userStatus: UserStatusEnum;

  @OneToOne(type => PlayerEntity)
  @JoinColumn()
  player: PlayerEntity;

  @ManyToOne(type => GameEntity, game => game.users)
  game: GameEntity;
}
