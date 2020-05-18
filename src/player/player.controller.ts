import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { PlayerDTO } from 'src/player/player.dto';
import { PlayerService } from 'src/player/player.service';

@Controller('player')
export class PlayerController {
  constructor(private serv: PlayerService) { }

  @Get()
  public async getAll(): Promise<PlayerDTO[]> {
    return await this.serv.getAll()
  }

  @Get(':id')
  public async findById(@Param('id') id: number) {
    return await this.serv.get(id)
  }

  @Post()
  public async post(@Body() dto: PlayerDTO): Promise<PlayerDTO> {
    return this.serv.create(dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.serv.delete(id);
  }
}
