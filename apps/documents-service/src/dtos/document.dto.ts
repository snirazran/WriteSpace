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

class ProjectInfo {
  @ApiProperty({
    description: 'Project ID',
  })
  projectId: string;

  @ApiProperty({
    description: 'Project name',
  })
  name: string;

  @ApiProperty({
    description: 'Project Image',
  })
  img: string;
  @ApiProperty({
    description: 'Project Genre',
  })
  genre: string;
}

export class DocumentResponseDTO {
  @ApiProperty({
    description: 'Document id',
  })
  _id: string;

  @ApiProperty({
    description: 'User info',
    type: UserInfo,
  })
  userInfo: UserInfo;

  @ApiProperty({
    description: 'Project info',
    type: ProjectInfo,
  })
  projectInfo: ProjectInfo;

  @ApiProperty({
    description: 'Document name',
    maximum: 40,
  })
  name: string;

  @ApiProperty({
    description: 'Document type',
    required: true,
  })
  type: string;

  @ApiProperty({
    description: 'Document description',
    default: '',
  })
  content: string;

  @ApiProperty({
    description: 'Document wordCount',
    default: 0,
  })
  wordCount: number;

  @ApiProperty({
    description: 'Document share status',
    default: true,
  })
  shared: boolean;

  @ApiProperty({
    description: 'Date document created at',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date document was last updated',
    type: Date,
  })
  updatedAt: Date;
}
