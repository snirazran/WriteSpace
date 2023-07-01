import { Link, useNavigate } from 'react-router-dom';
import './ProjectBox.css';
import { FaTrash } from 'react-icons/fa';
import SecondaryBtn from './../Buttons/SecondaryBtn';
import { useAuth } from '../../context/AuthContext';
import { ProjectResponseDTO } from 'api-client/projects';

type ProjectBoxProps = {
  content: ProjectResponseDTO;
  deleteFunc: (id: string) => void;
};

const ProjectBox: React.FC<ProjectBoxProps> = ({ content, deleteFunc }) => {
  const { user } = useAuth();

  // Determine if user is the owner of the project
  let isUserProject = () => (user?._id === content?.userId ? true : false);

  const deleteContent = () => {
    deleteFunc(content._id);
    navigate(`/projects/${user!._id}`);
  };

  const navigate = useNavigate();

  // Determine if project page or post page
  const isProject = () => {
    return window.location.href.includes('projects/') ? true : false;
  };

  let project: boolean;
  if (window.location.href.includes('projects/')) {
    project = true;
  }
  if (window.location.href.includes('posts/')) {
    project = false;
  }
  // Edit button click function

  const onClick = (id: string) => {
    if (project) {
      navigate(`/projects/project/edit/${id}`);
    }
    if (!project) {
      navigate(`/posts/edit/${id}`);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="project-box">
      {isUserProject() ? (
        <div className="trash-btn" onClick={deleteContent}>
          <FaTrash />
        </div>
      ) : (
        <></>
      )}
      <div className="project-details">
        <div className="project-datails-image">
          <img src={content ? content.img : ''} alt="" />
        </div>

        <h1>{content ? content.name : ''}</h1>
      </div>
      <div className="author-details">
        <p>
          <span>{content ? content.genre : ''}, </span>
          <Link to={`/projects/${content ? content.userInfo.userId : ''}`}>
            {`By ${content ? content.userInfo.username : ''}`}
          </Link>
        </p>
        <Link to={`/projects/${content ? content.userInfo.userId : ''}`}>
          <div className="project-author-img">
            <img src={content ? content.userInfo.img : ''} alt="" />
          </div>
        </Link>
      </div>
      {isUserProject() ? (
        <div
          className="edit-btn"
          onClick={() => {
            onClick(content ?? content._id);
          }}
        >
          {/* <SecondaryBtn
            onClick={}
            btnText={isProject() ? 'Edit Project' : 'Edit Post'}
          /> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectBox;
