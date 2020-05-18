import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>) { }

  public async getAll(): Promise<UserDTO[]> {
    return await this.repo.find()
      .then((items: UserEntity[]) => items.map((e: UserEntity) => UserDTO.fromEntity(e)));
  }

  public async get(id: number): Promise<UserDTO[]> {
    return await this.repo.find({ id })
      .then(items => items.map(e => UserDTO.fromEntity(e)));
  }

  async create(dto: UserDTO): Promise<UserDTO> {
    return this.repo.save(dto)
      .then(e => UserDTO.fromEntity(e));
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repo.delete({ id });
  }
}
