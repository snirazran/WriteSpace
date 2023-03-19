import { FaHeart, FaComment } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SecondaryBtn from './Buttons/SecondaryBtn';
import { FaTrash } from 'react-icons/fa';

import './PostBox.css';
import 'quill/dist/quill.snow.css';

function PostBox({ content, deleteFunc }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { posts, postIsLoading, postIsError, postMessage, postIsSuccess } =
    useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const isUserPost = () => {
    if (user._id === content.userId) {
      return true;
    }
  };

  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(content.createdAt);

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

  const deleteContent = () => {
    dispatch(deleteFunc(content._id));
    console.log(postIsSuccess);
    if (postIsSuccess) {
      navigate(`/projects/project/${content.projectId}`);
    }
  };

  if (content) {
    return (
      <div className="scribble-box">
        {isUserPost() ? (
          <div className="trash-btn" onClick={deleteContent}>
            <FaTrash />
          </div>
        ) : (
          <></>
        )}
        <div className="date">{date.toLocaleDateString('en-us', options)}</div>
        <div className="title">
          <img src={content.img} alt="img"></img>
          <h1>{`${content.name}`}</h1>
          <h2> {content.type}</h2>
        </div>
        <div className="author">
          <Link to={`/projects/${content.userId}`}>
            <h1>by {content.username}</h1>
            <img src={content.userImg} alt="" />
          </Link>
        </div>

        <div className="project-details">
          <Link to={`/projects/project/${content.projectId}`}>
            <h1>
              Post of{' '}
              {<span className="project-title">"{content.projectName}",</span>}
              <span> {content.projectGenre}</span>
            </h1>
            <img src={content.projectImg} alt="img"></img>
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
            <SecondaryBtn
              id="project-btn"
              btnText={project ? `Edit Project` : `Edit Post`}
            />
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
  }
}

export default PostBox;
