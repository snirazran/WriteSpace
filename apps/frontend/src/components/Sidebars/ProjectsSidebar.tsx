import React from 'react';
import './ProjectSideBar.css';
import ProjectSidebarItem from './ProjectSidebarItem';
import { GetAllUserProjectsDTO } from 'api-client/projects';

type ProjectsSideBarProps = {
  content: GetAllUserProjectsDTO | undefined;
};

const ProjectsSidebar: React.FC<ProjectsSideBarProps> = ({ content }) => {
  const noProjectsMessage = (
    <div className="sidebar your-projects" id="project-sidebar">
      <h1>Recent Projects</h1>
      <p>You have no projects yet</p>
    </div>
  );

  if (!content || content.projects.length === 0) {
    return noProjectsMessage;
  }

  const projects = content.projects.slice(0, 3);

  return (
    <div className="sidebar your-projects" id="project-sidebar">
      <h1>Recent Projects</h1>
      {projects.map((project) => (
        <ProjectSidebarItem key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsSidebar;
