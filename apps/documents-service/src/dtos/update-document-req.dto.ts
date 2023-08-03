import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocumentRequestDTO {
  @ApiProperty({
    description: 'Document name',
    maximum: 40,
    required: false,
  })
  name: string;

  @ApiProperty({
    description: 'Document description',
    default: '',
    required: false,
  })
  content: string;

  @ApiProperty({
    description: 'Document wordCount',
    default: 0,
    required: false,
  })
  wordCount: number;

  @ApiProperty({
    description: 'Project share status',
    default: true,
    required: false,
  })
  shared: boolean;
}
