import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { GameDTO } from 'src/game/game.dto';
import { GameService } from 'src/game/game.service';

@Controller('game')
export class GameController {
  constructor(private serv: GameService) { }

  @Get()
  public async getAll(): Promise<GameDTO[]> {
    return await this.serv.getAll()
  }

  @Get(':id')
  public async findById(@Param('id') id: number) {
    return await this.serv.get(id)
  }

  @Post()
  public async post(@Body() dto: GameDTO): Promise<GameDTO> {
    return this.serv.create(dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.serv.delete(id);
  }

  @Post()
  public async startGame(@Body() dto: GameDTO): Promise<GameDTO> {
    return this.serv.create(dto);
  }
}
