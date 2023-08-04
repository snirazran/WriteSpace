import { Icon, InlineIcon } from '@iconify/react';
import commentIcon from '@iconify/icons-fa-solid/comment';
import commentOutlinedIcon from '@iconify/icons-fa-regular/comment';
import likeIcon from '@iconify/icons-fa-solid/heart';
import likeOutlinedIcon from '@iconify/icons-fa-regular/heart';
import './LikeComment.css';
import { useState } from 'react';
import { UpdateDocumentRequestDTO } from 'api-client/documents';

type LikeCommentProps = {
  isWriting: boolean;
  updateFunc: (data: UpdateDocumentRequestDTO) => void;
};

const LikeComment: React.FC<LikeCommentProps> = ({ isWriting, updateFunc }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);

  const onLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const onCommentClick = () => {};

  return (
    <div className={`like-comment ${isWriting ? 'writing' : ''}`}>
      <div className="icons">
        {isLiked ? (
          <Icon onClick={onLikeClick} icon={likeIcon} className="like-icon" />
        ) : (
          <Icon
            onClick={onLikeClick}
            icon={likeOutlinedIcon}
            className="like-icon"
          />
        )}
        {isComment ? (
          <Icon
            onClick={onCommentClick}
            icon={commentIcon}
            className="comment-icon"
          />
        ) : (
          <Icon
            onClick={onCommentClick}
            icon={commentOutlinedIcon}
            className="comment-icon"
          />
        )}
      </div>
      <div className="like-text">
        <h1>Liked by Johnny sins and 100 more</h1>
      </div>
      <div className="comment-text">
        <p>View all 20 comments</p>
      </div>
    </div>
  );
};

export default LikeComment;
