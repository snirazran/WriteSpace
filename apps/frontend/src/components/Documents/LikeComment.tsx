import { Icon, InlineIcon } from '@iconify/react';
import commentIcon from '@iconify/icons-fa-solid/comment';
import commentOutlinedIcon from '@iconify/icons-fa-regular/comment';
import likeIcon from '@iconify/icons-fa-solid/heart';
import likeOutlinedIcon from '@iconify/icons-fa-regular/heart';
import './LikeComment.css';
import { useEffect, useState } from 'react';
import {
  DocumentResponseDTO,
  UpdateDocumentRequestDTO,
} from 'api-client/documents';
import { useAddRemoveLike } from '../../features/documents/documentsApi';

type LikeCommentProps = {
  isWriting: boolean;
  updateFunc: (data: UpdateDocumentRequestDTO) => void;
  document: DocumentResponseDTO | undefined;
  userId: string | undefined;
  postMutate: () => void;
  isComment: boolean;
  setIsComment: (isComment: boolean) => void;
};

const LikeComment: React.FC<LikeCommentProps> = ({
  isWriting,
  updateFunc,
  document,
  userId,
  postMutate,
  isComment,
  setIsComment,
}) => {
  const [isLiked, setIsLiked] = useState(
    document!.likes.some((like) => like.id === userId)
  );

  const {
    data: likeUnlikeDocument,
    error: likeError,
    isLoading: isLiking,
    reset: resetLike,
    trigger: likeUnlikeFunc,
  } = useAddRemoveLike();

  const onLikeClick = () => {
    setIsLiked(!isLiked);
    let documentId = document?._id;
    if (documentId && userId) {
      likeUnlikeFunc({ documentId, userId });
    }
  };

  const onCommentClick = () => {
    setIsComment(!isComment);
  };

  useEffect(() => {
    postMutate();
  }, [likeUnlikeDocument]);

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
        <h1>
          {document?.likes.length
            ? `Liked by ${document.likes.length}`
            : 'Be the first to like!'}
        </h1>
      </div>
      <div className="comment-text">
        {document?.comments.length ? (
          <p>View all {document?.comments.length} comments</p>
        ) : (
          <p>No comments yet...</p>
        )}
      </div>
    </div>
  );
};

export default LikeComment;
