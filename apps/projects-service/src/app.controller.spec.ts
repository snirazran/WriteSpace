import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectController', () => {
  let projectController: ProjectsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService],
    }).compile();

    projectController = app.get<ProjectsController>(ProjectsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(projectController.getHello()).toBe('Hello World!');
    });
  });
});
