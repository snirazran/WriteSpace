import { Comments, DocumentResponseDTO } from 'api-client/documents';
import './Comment.css';
import { useNavigate } from 'react-router-dom';
import { User } from '../../utils/user';
import { useDeleteComment } from '../../features/documents/documentsApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
type CommentProps = {
  document: DocumentResponseDTO | undefined;
  postMutate: () => void;
  comment: Comments;
  user: User | null;
};

const Comment: React.FC<CommentProps> = ({
  comment,
  user,
  document,
  postMutate,
}) => {
  const navigate = useNavigate();

  let isUserComment = () => user?._id === comment?.userId;

  const {
    data: deletedComment,
    trigger: deleteFunc,
    isLoading: isDeleting,
  } = useDeleteComment(user?._id!, document?._id!, comment.id!);

  const deleteComment = () => {
    deleteFunc();
    if (!isDeleting) {
      toast.success('Comment deleted successfully');
    }
  };

  const onClickNav = (id: string) => {
    navigate(`/profile/${id}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    postMutate();
  }, [deletedComment]);

  return (
    <div className="comments-section">
      <div
        onClick={() => {
          onClickNav(comment.userId);
        }}
        className="comment-user-img"
      >
        <img src={comment.img} alt="" />
      </div>
      <div className="comment-content">
        {isUserComment() && (
          <div onClick={deleteComment} className="comment-delete">
            x
          </div>
        )}
        <div
          onClick={() => {
            onClickNav(comment.userId);
          }}
          className="comment-user-name"
        >
          {comment.username}
        </div>
        <div className="comment-text">
          <p>{comment.commentContent}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
