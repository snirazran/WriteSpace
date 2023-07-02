import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty({
    description: 'User ID',
  })
  userId: string;

  @ApiProperty({
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    description: 'User Image',
  })
  img: string;
}

export class ProjectResponseDTO {
  @ApiProperty({
    description: 'Project id',
  })
  _id: string;

  @ApiProperty({
    description: 'User info',
    type: UserInfo,
  })
  userInfo: UserInfo;

  @ApiProperty({
    description: 'Project name',
    minimum: 2,
    maximum: 40,
  })
  name: string;

  @ApiProperty({
    description: 'Project img',
    default: '',
  })
  img: string;

  @ApiProperty({
    description: 'Project genre',
    required: true,
  })
  genre: string;

  @ApiProperty({
    description: 'Project description',
    maximum: 300,
    default: '',
  })
  description: string;

  @ApiProperty({
    description: 'Project share status',
    default: true,
  })
  shared: boolean;
}
