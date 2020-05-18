import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from '../dto/user.dto';
import { PlayerService } from '../player/player.service';

export class LoginDTO implements Readonly<LoginDTO> {
  @ApiProperty({ type: 'string' })
  userName: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private playerService: PlayerService,
  ) { }

  @Post('login')
  public async login(@Response() res, @Body() login: LoginDTO) {
    const userDTO = new UserDTO();
    userDTO.userName = login.userName;
    const newUser = await this.userService.create(userDTO);
    return res.status(HttpStatus.CREATED).json(newUser);
  }
}
