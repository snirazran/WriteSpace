import { ProjectResponseDTO } from 'api-client/projects';
import { useNavigate } from 'react-router-dom';

type ProjectSidebarItemProps = {
  project: ProjectResponseDTO | undefined;
};

const ProjectSidebarItem: React.FC<ProjectSidebarItemProps> = ({ project }) => {
  const navigate = useNavigate();
  const onClick = (id: string) => {
    navigate(`/projects/project/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div
      key={project?._id}
      className="sidebar-row"
      onClick={() => {
        onClick(project?._id!);
      }}
    >
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
