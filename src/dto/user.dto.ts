import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entity/user.entity';

export class UserDTO implements Readonly<UserDTO> {
  @ApiProperty({ type: 'string', uniqueItems: true })
  userName: string;

  public static from(dto: Partial<UserDTO>) {
    const user = new UserDTO();
    user.userName = dto.userName;
    return user;
  }

  public static fromEntity(entity: UserEntity) {
    return this.from({
      userName: entity.userName,
    });
  }

  public toEntity(this: UserDTO) {
    const user = new UserEntity();
    user.userName = this.userName;
    user.createDateTime = new Date();
    return user;
  }
}
