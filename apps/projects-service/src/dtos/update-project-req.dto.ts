import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectRequestDTO {
  @ApiProperty({
    description: 'Project name',
    minimum: 2,
    maximum: 40,
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Project img',
    default: '',
    required: false,
  })
  img?: string;

  @ApiProperty({
    description: 'Project description',
    maximum: 300,
    default: '',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Project share status',
    default: true,
    required: false,
  })
  shared?: boolean;
}
