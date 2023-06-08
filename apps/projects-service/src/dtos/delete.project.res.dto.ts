import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectResDTO {
  @ApiProperty({
    description: 'project id',
  })
  _id: string;
}
