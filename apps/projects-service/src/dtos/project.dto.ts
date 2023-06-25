import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponseDTO {
  @ApiProperty({
    description: 'Project id',
  })
  _id: string;

  @ApiProperty({
    description: 'User info',
  })
  userInfo: { userId: string; username: string; img: string };

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
