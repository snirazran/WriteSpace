import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDTO } from './user-response.dto';

export class GetAllUsersDTO {
  @ApiProperty({
    description: 'Users',
    type: [UserResponseDTO],
  })
  users: Array<UserResponseDTO>;
}
