import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty({
    description: 'User id',
  })
  _id: string;

  @ApiProperty({
    description: 'User name',
    minimum: 2,
    maximum: 20,
  })
  username: string;

  @ApiProperty({
    description: 'Email',
    maximum: 40,
  })
  email: string;

  @ApiProperty({
    description: 'Friends list',
    default: [],
    type: [UserResponseDTO],
  })
  friends: Array<string>;

  @ApiProperty({
    description: 'User bio',
    maximum: 200,
    default: '',
  })
  bio: string;

  @ApiProperty({
    description: 'User img',
    default: '',
  })
  img: string;
}
