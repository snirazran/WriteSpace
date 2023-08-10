import React from 'react';
import { ProjectResponseDTO } from 'api-client/projects';
import { useNavigate } from 'react-router-dom';
import './ProjectSideBar.css';

type ProjectSidebarItemProps = {
  project: ProjectResponseDTO | undefined;
};

const ProjectSidebarItem: React.FC<ProjectSidebarItemProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (project?._id) {
      navigate(`/projects/project/${project._id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="sidebar-row" onClick={handleItemClick}>
      <div className="project-img">
        <img src={project?.img} alt="" />
      </div>

      <div className="sidebar-text">
        <h1>{project?.name}</h1>
        <p>{project?.genre}</p>
      </div>
    </div>
  );
};

export default ProjectSidebarItem;
