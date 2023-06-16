import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateDocumentRequestDTO {
  @ApiProperty({
    description: 'User id',
  })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'Project id',
  })
  projectId: Types.ObjectId;

  @ApiProperty({
    description: 'Document type',
    required: true,
  })
  type: string;
}
