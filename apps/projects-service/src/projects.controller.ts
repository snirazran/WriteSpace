import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiHeader, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { GetAllUserProjectsDTO } from './dtos/get-user-projects.dto';
import {
  ProjectNotFound,
  ProjectsNotFound,
  InvalidDetails,
  UserNotFoundError,
} from './errors';
import { ProjectResponseDTO } from './dtos/project.dto';
import { CreateProjectRequestDTO } from './dtos/create-project-req.dto';

@ApiTags('projects')
@ApiHeader({
  name: 'Projects-API',
  description: 'Projects related endpoints',
})
@Controller('/api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  //Create a project
  @Post('/')
  @ApiResponse({ type: ProjectResponseDTO })
  async createProject(
    @Body() ProjectData: CreateProjectRequestDTO,
  ): Promise<ProjectResponseDTO | undefined> {
    try {
      return await this.projectsService.createProject(ProjectData);
    } catch (e) {
      if (e instanceof InvalidDetails) {
        throw new ConflictException('Invalid details');
      }
      if (e) {
        console.log(e);
      }
    }
  }

  //Get All Projects
  @Get('/:id')
  @ApiResponse({ type: GetAllUserProjectsDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the user id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getAllUserProjects(
    @Param() { id }: { id: string },
  ): Promise<GetAllUserProjectsDTO | undefined> {
    try {
      return { projects: await this.projectsService.getAllUserProjects(id) };
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
      if (e instanceof ProjectsNotFound) {
        throw new NotFoundException();
      }
    }
  }

  //Get a project by id
  @Get('/project/:projectId')
  @ApiResponse({ type: ProjectResponseDTO })
  @ApiParam({
    name: 'projectId',
    required: true,
    description: 'string for the project id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async getUserProjectById(
    @Param() { projectId }: { projectId: string },
  ): Promise<ProjectResponseDTO | undefined> {
    try {
      return await this.projectsService.getUserProjectById(projectId);
    } catch (e) {
      if (e instanceof ProjectNotFound) {
        throw new NotFoundException();
      }
    }
  }
}
