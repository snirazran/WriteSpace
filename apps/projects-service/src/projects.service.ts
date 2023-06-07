import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DBProject } from './schemas/project.schema';
import { ProjectResponseDTO } from './dtos/project.dto';
import {
  ProjectNotFound,
  ProjectsNotFound,
  InvalidDetails,
  UserNotFoundError,
} from './errors';
import { CreateProjectRequestDTO } from './dtos/create-project-req.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('projects') private projectModel: Model<DBProject>,
  ) {}

  //Create a new project
  async createProject(
    ProjectData: CreateProjectRequestDTO,
  ): Promise<ProjectResponseDTO> {
    try {
      const project = new this.projectModel(ProjectData);

      project.userId = ProjectData.userId;
      project.name = `A new ${project.genre}`;
      project.description = `A ${project.genre} description`;

      await project.save();

      const projectPlainObject = project.toObject();
      const projectStringId: ProjectResponseDTO = {
        ...projectPlainObject,
        _id: project._id.toString(),
      };
      return projectStringId;
    } catch (error) {
      if (error.name === 'CastError' && error.path === 'userId') {
        throw new InvalidDetails();
      }
      throw error;
    }
  }

  //Get All User Projects
  async getAllUserProjects(id: string): Promise<ProjectResponseDTO[]> {
    const docs = await this.projectModel
      .find({ userId: id })
      .populate('userId')
      .exec();

    if (!docs) {
      throw new ProjectsNotFound();
    }

    const filteredProjects = docs.map((obj) => {
      const { _id, name, userId, description, genre, img, shared } = obj;
      const projects = {
        _id: _id.toString(), // Convert ObjectId to string
        userId,
        name,
        description,
        genre,
        img,
        shared,
      };
      return projects;
    });

    return filteredProjects;
  }

  //Get a Project by id
  async getUserProjectById(projectId: string): Promise<ProjectResponseDTO> {
    const doc = await this.projectModel
      .findById({ projectId })
      .populate('userId')
      .exec();

    if (!doc) {
      throw new ProjectNotFound();
    }

    const ProjectPlainObject = doc.toObject();
    const ProjectStringId: ProjectResponseDTO = {
      ...ProjectPlainObject,
      _id: doc._id.toString(),
    };

    return ProjectStringId;
  }
}
