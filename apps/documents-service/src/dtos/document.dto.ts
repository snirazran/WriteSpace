import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class DocumentResponseDTO {
  @ApiProperty({
    description: 'Document id',
  })
  _id: string;

  @ApiProperty({
    description: 'User info',
  })
  userInfo: { userId: string; username: string; img: string };

  @ApiProperty({
    description: 'Project info',
  })
  projectInfo: { projectId: string; name: string; img: string; genre: string };

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
    description: 'Project share status',
    default: true,
  })
  shared: boolean;
}