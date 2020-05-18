import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from 'src/player/player.entity';
import { Repository, DeleteResult } from 'typeorm';
import { PlayerDTO } from 'src/player/player.dto';

@Injectable()
export class PlayerService {
  constructor(@InjectRepository(PlayerEntity) private readonly repo: Repository<PlayerEntity>) { }

  public async getAll(): Promise<PlayerDTO[]> {
    return await this.repo.find()
      .then((items: PlayerEntity[]) => items.map((e: PlayerEntity) => PlayerDTO.fromEntity(e)));
  }

  public async get(id: number): Promise<PlayerDTO[]> {
    return await this.repo.find({ id })
      .then(items => items.map(e => PlayerDTO.fromEntity(e)));
  }

  public async create(dto: PlayerDTO): Promise<PlayerDTO> {
    return this.repo.save(dto)
      .then(e => PlayerDTO.fromEntity(e));
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete({ id });
  }
}
