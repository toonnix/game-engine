import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { configService } from './config/config.service';
import { PlayerEntity } from './player/player.entity';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { GameService } from './game/game.service';
import { GameEntity } from './game/game.entity';
import { GameController } from './game/game.controller';
import { AuthController } from './controller/auth.controller';
import { UserStatusEntity } from './entity/user-status.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([
      UserEntity,
      PlayerEntity,
      GameEntity,
      UserStatusEntity
    ])
  ],
  controllers: [UserController, PlayerController, GameController, AuthController],
  providers: [UserService, PlayerService, GameService],
})
export class AppModule { }
