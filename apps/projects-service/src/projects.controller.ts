import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
  Delete,
  RequestTimeoutException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiHeader, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { GetAllUserProjectsDTO } from './dtos/get-user-projects.dto';
import {
  ProjectNotFound,
  ProjectsNotFound,
  InvalidDetails,
  UserNotFoundError,
  UserNotAuthorized,
  DocumentCreationFailed,
  ServiceNotRunning,
} from './errors';
import { ProjectResponseDTO } from './dtos/project.dto';
import { CreateProjectRequestDTO } from './dtos/create-project-req.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateProjectRequestDTO } from './dtos/update-project-req.dto';
import { DeleteProjectResDTO } from './dtos/delete.project.res.dto';
import { isServerUpDTO } from './dtos/isup.dto';

@ApiTags('projects')
@ApiHeader({
  name: 'Projects-API',
  description: 'Projects related endpoints',
})
@Controller('/api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  //Is server up
  @Get('/')
  @ApiResponse({ type: isServerUpDTO })
  async isServerUp(): Promise<isServerUpDTO | undefined> {
    try {
      return await this.projectsService.isServerUp();
    } catch (e) {
      if (e instanceof ServiceNotRunning) {
        throw new RequestTimeoutException();
      }
    }
  }

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
      if (e instanceof DocumentCreationFailed) {
        throw new ConflictException('Document creation failed');
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
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException();
      }
    }
  }

  //Update a project
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiResponse({ type: ProjectResponseDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the project id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async updateProject(
    @Param('id') id: string,
    @Request() req: any, // change to specific type
    @Body() projectData: UpdateProjectRequestDTO,
  ): Promise<ProjectResponseDTO | undefined> {
    try {
      return await this.projectsService.updateProject(
        id,
        req.user,
        projectData,
      );
    } catch (e) {
      if (e instanceof ProjectNotFound) {
        throw new NotFoundException();
      }
      if (e instanceof UserNotAuthorized) {
        throw new UnauthorizedException();
      }
    }
  }

  //Delete a project
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiResponse({ type: DeleteProjectResDTO })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'string for the project id',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async deleteProject(
    @Param('id') id: string,
    @Request() req: any, // change to specific type
  ): Promise<DeleteProjectResDTO | undefined> {
    // Delete project
    try {
      return await this.projectsService.deleteProject(id, req.user);
    } catch (e) {
      if (e instanceof ProjectNotFound) {
        throw new NotFoundException();
      }
      if (e instanceof UserNotAuthorized) {
        throw new UnauthorizedException();
      }
    }
  }
}
