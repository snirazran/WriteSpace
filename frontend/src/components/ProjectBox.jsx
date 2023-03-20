import { Link, useNavigate } from 'react-router-dom';
import './ProjectBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import SecondaryBtn from './Buttons/SecondaryBtn';

function ProjectBox({ content, deleteFunc }) {
  const { user } = useSelector((state) => state.auth);

  const isUserProject = () => {
    if (content && user._id === content.userId) {
      return true;
    }
  };

  const deleteContent = () => {
    dispatch(deleteFunc(content._id));

    navigate(`/projects/${user._id}`);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Determine if project page or post page

  let project;
  if (window.location.href.includes('projects/')) {
    project = true;
  }
  if (window.location.href.includes('posts/')) {
    project = false;
  }
  // Edit button click function

  const onClick = (id) => {
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
        <img src={content && content.img} alt="" />
        <h1>{content && content.name}</h1>
      </div>
      <div className="author-details">
        <p>
          <span>{content && content.genre}, </span>
          <Link to={`/projects/${content && content.userId}`}>
            {`By ${content && content.username}`}
          </Link>
        </p>
        <Link to={`/projects/${content && content.userId}`}>
          <img src={content && content.userImg} alt="" />
        </Link>
      </div>
      {isUserProject() ? (
        <div
          className="edit-btn"
          onClick={() => {
            onClick(content._id);
          }}
        >
          <SecondaryBtn
            id="project-btn"
            btnText={project ? `Edit Project` : `Edit Post`}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProjectBox;
