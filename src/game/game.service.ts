import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/game/game.entity';
import { Repository, DeleteResult } from 'typeorm';
import { GameDTO } from 'src/game/game.dto';

@Injectable()
export class GameService {
  constructor(@InjectRepository(GameEntity) private readonly repo: Repository<GameEntity>) { }

  public async getAll(): Promise<GameDTO[]> {
    return await this.repo.find()
      .then((items: GameEntity[]) => items.map((e: GameEntity) => GameDTO.fromEntity(e)));
  }

  public async get(id: number): Promise<GameDTO[]> {
    return await this.repo.find({ id })
      .then(items => items.map(e => GameDTO.fromEntity(e)));
  }

  public async create(dto: GameDTO): Promise<GameDTO> {
    return this.repo.save(dto)
      .then(e => GameDTO.fromEntity(e));
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete({ id });
  }
}
