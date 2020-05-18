import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';
import { MaxLength } from 'class-validator';
import { GameEntity } from '../game/game.entity';
import { UserStatusEntity } from '../entity/user-status.entity';

export class TokenInHand {
  @Column({ type: 'integer' })
  attack: number;

  @Column({ type: 'integer' })
  move: number;

  @Column({ type: 'integer' })
  heroic_action: number;

  @Column({ type: 'integer' })
  wild_card: number;
}

@Entity({ name: 'player' })
export class PlayerEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  playerHash: string;

  @Column({ type: 'varchar' })
  @MaxLength(50)
  heroCode: string;

  @Column({ type: 'varchar', array: true })
  cardInHand: string[];

  @Column({ type: 'varchar', array: true })
  cardInTimeLine: string[];

  @Column(type => TokenInHand)
  tokenInHand: TokenInHand;

  @OneToOne(type => UserStatusEntity)
  @JoinColumn()
  userStatus: UserStatusEntity;

  @ManyToOne(type => GameEntity, game => game.players)
  game: GameEntity;
}
