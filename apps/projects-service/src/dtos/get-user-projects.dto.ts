import { ApiProperty } from '@nestjs/swagger';
import { ProjectResponseDTO } from './project.dto';

export class GetAllUserProjectsDTO {
  @ApiProperty({
    description: 'Projects',
  })
  projects: Array<ProjectResponseDTO>;
}
