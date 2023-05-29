import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserResDto {
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
    maximum: 100,
    default: '',
  })
  img: string;

  @ApiProperty({
    description: 'User token',
  })
  token: string;
}
