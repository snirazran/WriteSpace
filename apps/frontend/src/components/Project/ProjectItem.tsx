import { ProjectResponseDTO } from 'api-client/projects';

type ProjectItemProps = {
  project: ProjectResponseDTO;
};

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <div className="box">
      <div className="main-slider-img">
        <img src={project.img} alt="" />
      </div>
      <div className="box-text ">
        <h1>{project.name}</h1>
        <p>{project.genre}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
