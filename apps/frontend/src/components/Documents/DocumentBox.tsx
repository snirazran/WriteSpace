import { FaHeart, FaComment } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import SecondaryBtn from '../Buttons/SecondaryBtn';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './DocumentBox.css';
import 'quill/dist/quill.snow.css';

const DocumentBox = ({ content, deleteFunc }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isUserPost = () => user!._id === content.userId;

  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(content?.createdAt);

  // Determine if project page or post page

  let project: boolean;
  const url = window.location.href;
  project = url.includes('projects/') && !url.includes('posts/');

  // Edit button click function

  const onClick = (id) => {
    if (project) {
      navigate(`/projects/project/edit/${id}`);
    }
    if (!project) {
      navigate(`/documents/edit/${id}`);
    }
    window.scrollTo(0, 0);
  };

  const deleteContent = () => {
    deleteFunc(content._id);
    navigate(`/projects/project/${content.projectId}`);
  };

  return (
    <div className="scribble-box">
      {isUserPost() && (
        <div className="trash-btn" onClick={deleteContent}>
          <FaTrash />
        </div>
      )}
      {/* <div className="date">{date.toLocaleDateString('en-us', options)}</div> */}
      <div className="title">
        <div className="post-box-img">
          <img src={content.img} alt="img"></img>
        </div>
        <h1>{`${content.name}`}</h1>
        <h2> {content.type}</h2>
      </div>
      <div className="author">
        <Link to={`/projects/${content.userId}`}>
          <h1>by {content.username}</h1>
          <div className="post-user-img">
            <img src={content.userImg} alt="" />
          </div>
        </Link>
      </div>

      <div className="project-details">
        <Link to={`/projects/project/${content.projectId}`}>
          <h1>
            Post of{' '}
            {<span className="project-title">"{content.projectName}",</span>}
            <span> {content.projectGenre}</span>
          </h1>
          <div className="post-project-img">
            <img src={content.projectImg} alt="img"></img>
          </div>
        </Link>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: content.content }}
        className="ql-editor"
        id="post-content"
      ></div>
      {isUserPost() ? (
        <div
          className="edit-btn"
          onClick={() => {
            onClick(content._id);
          }}
        >
          <SecondaryBtn btnText={project ? `Edit Project` : `Edit Post`} />
        </div>
      ) : (
        <></>
      )}

      <div className="like-comment">
        <div className="icons">
          <FaHeart className="like-icon" />
          <FaComment className="comment-icon" />
        </div>
        <div className="like-text">
          <h1>Liked by Johnny sins and 100 more</h1>
        </div>
        <div className="comment-text">
          <p>View all 20 comments</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentBox;
