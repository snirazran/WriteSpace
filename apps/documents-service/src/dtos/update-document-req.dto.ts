import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocumentRequestDTO {
  @ApiProperty({
    description: 'Document name',
    maximum: 40,
  })
  name: string;

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
