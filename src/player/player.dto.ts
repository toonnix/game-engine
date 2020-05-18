import { ApiProperty } from '@nestjs/swagger';
import { PlayerEntity } from 'src/player/player.entity';
import { MaxLength, IsUUID } from 'class-validator';
import { TokenInHand } from 'src/player/player.entity';
import { Generated } from 'typeorm';
import { UserStatusEntity } from 'src/entity/user-status.entity';
import { GameEntity } from 'src/game/game.entity';

export class PlayerDTO implements Readonly<PlayerDTO> {
  @ApiProperty({ type: 'string' })
  @Generated('uuid')
  @IsUUID()
  playerHash: string;

  @ApiProperty({ type: 'string' })
  userName: string;

  @ApiProperty({ type: 'string' })
  @IsUUID()
  gameHash: string;

  @ApiProperty({ type: 'string' })
  @MaxLength(50)
  heroCode: string;

  @ApiProperty({ type: 'string', isArray: true })
  cardInHand: string[];

  @ApiProperty({ type: 'string', isArray: true })
  cardInTimeLine: string[];

  @ApiProperty({ type: TokenInHand })
  tokenInHand: TokenInHand;

  @ApiProperty({ type: UserStatusEntity })
  userStatus: UserStatusEntity;

  @ApiProperty({ type: GameEntity, isArray: true })
  game: GameEntity;

  public static from(dto: Partial<PlayerDTO>) {
    const player = new PlayerDTO();
    player.playerHash = dto.playerHash;
    player.userName = dto.userName;
    player.gameHash = dto.gameHash;
    player.heroCode = dto.heroCode;
    player.cardInHand = dto.cardInHand;
    player.cardInTimeLine = dto.cardInTimeLine;
    player.tokenInHand = dto.tokenInHand;
    player.userStatus = dto.userStatus;
    player.game = dto.game;
    return player;
  }

  public static fromEntity(entity: PlayerEntity) {
    return this.from({
      playerHash: entity.playerHash,
      heroCode: entity.heroCode,
      cardInHand: entity.cardInHand,
      cardInTimeLine: entity.cardInTimeLine,
      tokenInHand: entity.tokenInHand,
      userStatus: entity.userStatus,
      game: entity.game,
    });
  }

  public toEntity(this: PlayerDTO) {
    const player = new PlayerEntity();
    player.playerHash = this.playerHash;
    player.heroCode = this.heroCode;
    player.cardInHand = this.cardInHand;
    player.cardInTimeLine = this.cardInTimeLine;
    player.tokenInHand = this.tokenInHand;
    player.userStatus = this.userStatus;
    player.game = this.game;
    player.createDateTime = new Date();
    return player;
  }
}
