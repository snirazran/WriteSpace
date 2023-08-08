import { Comments } from 'api-client/documents';
import './Comment.css';
import { useNavigate } from 'react-router-dom';
type CommentProps = {
  comment: Comments;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const navigate = useNavigate();

  const onClickNav = (id: string) => {
    navigate(`/profile/${id}`);
    window.scrollTo(0, 0);
  };
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
        <div
          onClick={() => {
            onClickNav(comment.userId);
          }}
          className="comment-user-name"
        >
          {comment.username}
        </div>
        <div className="comment-text">{comment.commentContent}</div>
      </div>
    </div>
  );
};

export default Comment;
