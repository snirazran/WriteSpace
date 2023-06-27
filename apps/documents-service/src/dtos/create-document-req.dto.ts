import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateDocumentRequestDTO {
  @ApiProperty({
    description: 'User id',
  })
  userId: string;

  @ApiProperty({
    description: 'Project id',
  })
  projectId: string;

  @ApiProperty({
    description: 'Document type',
    required: true,
  })
  type: string;
}
