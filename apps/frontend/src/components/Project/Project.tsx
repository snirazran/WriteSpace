// Imports
import { useNavigate } from 'react-router-dom';
import { ProjectResponseDTO } from 'api-client/projects';
import './Project.css';

type FriendProps = {
  project: ProjectResponseDTO | undefined;
};

const Project: React.FC<FriendProps> = ({ project }) => {
  // Hooks
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/projects/project/${project?._id}`);
    window.scrollTo(0, 0);
  };

  // Main render
  return (
    <div className="project-row">
      <div className="project-img">
        <img onClick={onClick} src={project?.img} alt="img" />
      </div>
      <div className="project-rightside">
        <div onClick={onClick} className="project-rightside-text">
          <h1>{project?.name}</h1>
          <p>{project?.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default Project;
