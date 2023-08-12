import { DocumentResponseDTO } from 'api-client/documents';
import { Link, useNavigate } from 'react-router-dom';
import LikeComment from './LikeComment';
import { FaEdit, FaLock, FaTrash, FaUnlock } from 'react-icons/fa';
import { User } from '../../utils/user';
import {
  useDeleteDocument,
  useUpdateDocument,
} from '../../features/documents/documentsApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import './DocumentFeedBox.css';

type DocumentFeedBoxProps = {
  content: DocumentResponseDTO | undefined;
  close: () => void;
  user: User | null;
  postMutate: () => void;
};
const DocumentFeedBox: React.FC<DocumentFeedBoxProps> = ({
  content,
  close,
  user,
  postMutate,
}) => {
  const navigate = useNavigate();
  const isUserPost = () => user!._id === content?.userInfo.userId;

  const { data: deletedPost, trigger: deletePost } = useDeleteDocument(
    content?._id!
  );

  const { data: updatedDocument, trigger: updateFunc } = useUpdateDocument(
    content?._id!
  );

  const onShareUpdate = () => {
    updateFunc({ shared: !content?.shared });
    if (content?.shared) {
      toast.success('Post set to private');
    } else {
      toast.success('Post set to public');
    }
  };

  const onEditClick = () => {
    navigate(`/document/${content?._id}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    postMutate();
  }, [updatedDocument, deletedPost]);

  let options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(content?.createdAt!);

  return (
    <div className="document-feed-box-overlay" onClick={close}>
      <div className="scribble-box" onClick={(e) => e.stopPropagation()}>
        <div className="document-top-buttons">
          {isUserPost() && (
            <>
              <div className="trash-btn" onClick={() => deletePost()}>
                <FaTrash />
              </div>
              <div className="edit-btn-cover">
                <div onClick={onEditClick} className="edit-btn">
                  <FaEdit />
                </div>
              </div>
              <div className="share-btn-cover">
                <div onClick={onShareUpdate} className="share-btn">
                  {content?.shared ? <FaUnlock /> : <FaLock />}
                  {content?.shared ? <h1>Public</h1> : <h1>Private</h1>}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="date">{date.toLocaleDateString('en-us', options)}</div>
        <div className="title">
          <h1>
            {content?.name?.trim() === '' ? 'Add a title...' : content?.name}
          </h1>
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
          {isUserPost() && (
            <div className="word-count">
              <h1>{`${content?.wordCount} words`}</h1>
            </div>
          )}

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
        <LikeComment document={content} user={user} postMutate={postMutate} />
      </div>
    </div>
  );
};

export default DocumentFeedBox;
