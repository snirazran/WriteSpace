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
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateProjectRequestDTO } from './dtos/update-project-req.dto';
import { DeleteProjectResDTO } from './dtos/delete.project.res.dto';

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
    // Check if the user is the same as the one that is logged in
    if (req.user._id !== id) {
      throw new UnauthorizedException();
    }
    // Update user
    try {
      return await this.projectsService.updateProject(id, projectData);
    } catch (e) {
      if (e instanceof ProjectNotFound) {
        throw new NotFoundException();
      }
    }
  }

  //Delete a project
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiResponse({ type: ProjectResponseDTO })
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
    // Check if the user is the same as the one that is logged in
    if (req.user._id !== id) {
      throw new UnauthorizedException();
    }
    // Update user
    try {
      return await this.projectsService.deleteProject(id);
    } catch (e) {
      if (e instanceof ProjectNotFound) {
        throw new NotFoundException();
      }
    }
  }
}
