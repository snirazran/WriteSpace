import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class GetAllUsersDTO {
  @ApiProperty({
    description: 'Users',
  })
  users: Array<UserDTO>;
}
