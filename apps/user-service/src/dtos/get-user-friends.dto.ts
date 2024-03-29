import { ApiProperty } from '@nestjs/swagger';

export class GetUserFriendsRequestDTO {
  @ApiProperty({
    description: 'User name',
    minimum: 2,
    maximum: 20,
  })
  username: string;

  @ApiProperty({
    description: 'User bio',
    maximum: 200,
    default: '',
  })
  bio: string;

  @ApiProperty({
    description: 'User img',
  })
  img: string;
}
