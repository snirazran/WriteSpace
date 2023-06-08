import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectRequestDTO {
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
