import { Link, useNavigate } from 'react-router-dom';
import './ProjectBox.css';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { ProjectResponseDTO } from 'api-client/projects';
import { toCapital } from '../../utils/toCapital';

type ProjectBoxProps = {
  content?: ProjectResponseDTO;
  deleteFunc: (id: string) => void;
};

const ProjectBox: React.FC<ProjectBoxProps> = ({ content, deleteFunc }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Determine if user is the owner of the project
  let isUserProject = () =>
    user?._id === content?.userInfo.userId ? true : false;

  const deleteContent = () => {
    deleteFunc(content?.userInfo.userId!);
    navigate(`/profile/${user!._id}`);
  };

  // Edit button click function

  const onEditClick = (id: string) => {
    navigate(`/projects/project/edit/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="project">
      <div className="project-box">
        {/* {isUserProject() ? (
          <div className="trash-btn" onClick={deleteContent}>
            <FaTrash />
          </div>
        ) : (
          <></>
        )} */}
        <div className="project-details">
          <div className="project-datails-image">
            <img src={content?.img} alt="" />
          </div>

          <div className="project-details-text">
            <h1>{content?.name}</h1>
            <div className="project-details-author">
              <p>
                <span>{content?.genre}, </span>
                <Link to={`/profile/${content?.userInfo.userId}`}>
                  {`By ${toCapital(content?.userInfo.username!)}`}
                </Link>
              </p>
              <Link to={`/profile/${content?.userInfo.userId}`}>
                <div className="project-author-img">
                  <img src={content?.userInfo.img} alt="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
