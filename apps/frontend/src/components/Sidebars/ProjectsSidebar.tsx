import './ProjectsSidebar.css';
import ProjectSidebarItem from './ProjectSidebarItem';
import { GetAllUserProjectsDTO, ProjectResponseDTO } from 'api-client/projects';

type ProjectsSideBarProps = {
  content: GetAllUserProjectsDTO | undefined;
};

const ProjectsSidebar: React.FC<ProjectsSideBarProps> = ({ content }) => {
  if (content?.projects.length === 0)
    return (
      <div className="sidebar your-projects" id="project-sidebar">
        <h1>Recent Projects</h1>
        <p>You have no projects yet</p>
      </div>
    );
  let items: Array<ProjectResponseDTO> = [];
  if (content) items = content.projects;
  const projects = items.slice(0, 5);
  return (
    <div className="sidebar your-projects" id="project-sidebar">
      <h1>Recent Projects</h1>
      {projects.map((content) => (
        <ProjectSidebarItem key={content._id} project={content} />
      ))}
    </div>
  );
};

export default ProjectsSidebar;
