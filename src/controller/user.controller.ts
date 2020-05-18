import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UserService } from 'src/service/user.service';
import { UserDTO } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private serv: UserService) { }

  @Get()
  public async getAll(): Promise<UserDTO[]> {
    return await this.serv.getAll()
  }

  @Get(':id')
  public async findById(@Param('id') id: number) {
    return await this.serv.get(id)
  }

  @Post()
  public async create(@Body() dto: UserDTO): Promise<UserDTO> {
    return this.serv.create(dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.serv.delete(id);
  }
}
