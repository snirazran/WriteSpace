import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDTO } from './user-response.dto';

export class GetAllUsersFriendsDTO {
  @ApiProperty({
    description: 'User friends',
    type: [UserResponseDTO],
  })
  userFriends: Array<UserResponseDTO>;
}
