import { FaHeart, FaComment } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import SecondaryBtn from '../Buttons/SecondaryBtn';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './DocumentBox.css';
import 'quill/dist/quill.snow.css';
import { DocumentResponseDTO } from 'api-client/documents';
import { Icon, InlineIcon } from '@iconify/react';
import commentIcon from '@iconify/icons-fa-solid/comment';
import commentOutlinedIcon from '@iconify/icons-fa-regular/comment';

type DocumentBoxProps = {
  content: DocumentResponseDTO | undefined;
  deleteFunc: () => void;
};

const DocumentBox: React.FC<DocumentBoxProps> = ({ content, deleteFunc }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isUserPost = () => user!._id === content?.userInfo.userId;

  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(content?.createdAt!);

  // Edit button click function

  const onClick = (id: string) => {
    navigate(`/documents/edit/${id}`);
    window.scrollTo(0, 0);
  };

  const deletePost = () => {
    deleteFunc();
    navigate(`/projects/project/${content?.projectInfo.projectId}`);
  };

  return (
    <div className="scribble-box">
      {isUserPost() && (
        <div className="trash-btn" onClick={() => deletePost()}>
          <FaTrash />
        </div>
      )}
      <div className="date">{date.toLocaleDateString('en-us', options)}</div>
      <div className="title">
        <h1>{`${content?.name}`}</h1>
      </div>
      <div className="author">
        <Link to={`/profile/${content?.userInfo.userId}`}>
          <h1>By {content?.userInfo.username}</h1>
          <div className="post-user-img">
            <img src={content?.userInfo.img} alt="" />
          </div>
        </Link>
      </div>

      <div className="project-details">
        <Link to={`/projects/project/${content?.projectInfo.projectId}`}>
          <h1>
            {`${content?.type} of `}
            {
              <span className="project-title">
                "{content?.projectInfo.name}",
              </span>
            }
            <span> {content?.projectInfo.genre}</span>
          </h1>
          <div className="post-project-img">
            <img src={content?.projectInfo.img} alt="img"></img>
          </div>
        </Link>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: content?.content! }}
        className="ql-editor"
        id="post-content"
      ></div>
      {isUserPost() ? (
        <div
          className="edit-btn"
          onClick={() => {
            onClick(content?._id!);
          }}
        ></div>
      ) : (
        <></>
      )}

      <div className="like-comment">
        <div className="icons">
          <FaHeart className="like-icon" />
          <Icon icon={commentOutlinedIcon} className="comment-icon" />
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
