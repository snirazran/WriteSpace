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
import { UpdateProjectRequestDTO } from './dtos/update-project-req.dto';
import { DeleteProjectResDTO } from './dtos/delete.project.res.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('projects') private projectModel: Model<DBProject>,
    private readonly httpService: HttpService,
  ) {}

  //Create a new project
  async createProject(
    ProjectData: CreateProjectRequestDTO,
  ): Promise<ProjectResponseDTO> {
    try {
      const project = new this.projectModel(ProjectData);

      project.name = `A New ${project.genre}`;
      project.description = `A ${project.genre} Description`;
      project.img = `https://firebasestorage.googleapis.com/v0/b/writespace-f343f.appspot.com/o/projectImages%2Fplaceholder.png?alt=media&token=5c87f4fa-d7a8-4800-873f-82f4947952bf`;

      let user;
      try {
        const response = await firstValueFrom(
          this.httpService.get(
            `http://localhost:3000/api/users/${ProjectData.userId}`,
          ),
        );
        user = response.data;
      } catch (error) {
        throw new UserNotFoundError();
      }
      project.userInfo = {
        userId: user._id.toString(),
        username: user.username,
        img: user.img,
      };
      await project.save();

      const projectPlainObject = project.toObject();
      const projectStringId: ProjectResponseDTO = {
        ...projectPlainObject,
        _id: project._id.toString(),
      };
      return projectStringId;
    } catch (error) {
      if (error) {
        throw new InvalidDetails();
      }
      throw error;
    }
  }

  //Get All User Projects
  async getAllUserProjects(id: string): Promise<ProjectResponseDTO[]> {
    const docs = await this.projectModel.find({ userId: id }).exec();

    if (!docs) {
      throw new ProjectsNotFound();
    }

    const projectsWithUserData = await Promise.all(
      docs.map(async (doc) => {
        let user;
        try {
          const response = await firstValueFrom(
            this.httpService.get(
              `http://localhost:3000/api/users/${doc.userInfo.userId}`,
            ),
          );
          const { userId, img, username } = response.data;
          user = { userId, img, username };
        } catch (error) {
          throw new UserNotFoundError();
        }

        const { _id, name, description, genre, img, shared } = doc;
        return {
          _id: _id.toString(),
          userInfo: {
            userId: user.userId,
            username: user.username,
            img: user.img,
          },
          name,
          description,
          genre,
          img,
          shared,
        };
      }),
    );

    return projectsWithUserData;
  }

  //Get a Project by id
  async getUserProjectById(projectId: string): Promise<ProjectResponseDTO> {
    const doc = await this.projectModel.findById(projectId).exec();

    if (!doc) {
      throw new ProjectNotFound();
    }

    let user;
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `http://localhost:3000/api/users/${doc.userInfo.userId}`,
        ),
      );
      const { userId, img, username } = response.data;
      user = { userId, img, username };
    } catch (error) {
      throw new UserNotFoundError();
    }

    const ProjectPlainObject = doc.toObject();
    const ProjectStringId: ProjectResponseDTO = {
      ...ProjectPlainObject,
      _id: doc._id.toString(),
      userInfo: {
        userId: user.userId,
        username: user.username,
        img: user.img,
      },
    };

    return ProjectStringId;
  }

  //Update a Project
  async updateProject(
    id: string,
    projectData: UpdateProjectRequestDTO,
  ): Promise<ProjectResponseDTO> {
    // Check if project exists
    const project = await this.projectModel.findById(id).exec();

    if (!project) {
      throw new ProjectNotFound();
    }

    let user;
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `http://localhost:3000/api/users/${project.userInfo.userId}`,
        ),
      );

      const { userId, img, username } = response.data;
      user = { userId, img, username };
    } catch (error) {
      throw new UserNotFoundError();
    }

    // Update project

    const updatedProject = await this.projectModel.findByIdAndUpdate(
      id,
      projectData,
      {
        new: true,
      },
    );

    if (!updatedProject) {
      throw new ProjectNotFound();
    }

    const projectPlainObject = updatedProject.toObject();
    const projectStringId: ProjectResponseDTO = {
      ...projectPlainObject,
      _id: project._id.toString(),
      userInfo: {
        userId: user.userId,
        username: user.username,
        img: user.img,
      },
    };
    return projectStringId;
  }

  //Delete a Project
  async deleteProject(id: string): Promise<DeleteProjectResDTO> {
    // Check if project exists
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new ProjectNotFound();
    }

    await project.remove();

    const deleteProjectResDTO: DeleteProjectResDTO = { _id: id };
    return deleteProjectResDTO;
  }
}
