import { Icon, InlineIcon } from '@iconify/react';
import likeIcon from '@iconify/icons-fa-solid/heart';
import likeOutlinedIcon from '@iconify/icons-fa-regular/heart';
import './LikeComment.css';
import { useEffect, useState } from 'react';
import {
  DocumentResponseDTO,
  UpdateDocumentRequestDTO,
} from 'api-client/documents';
import { useAddRemoveLike } from '../../features/documents/documentsApi';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { User } from '../../utils/user';

type LikeCommentProps = {
  isWriting: boolean;
  updateFunc: (data: UpdateDocumentRequestDTO) => void;
  document: DocumentResponseDTO | undefined;
  user: User | null;
  postMutate: () => void;
  isComment: boolean;
  setIsComment: (isComment: boolean) => void;
};

const LikeComment: React.FC<LikeCommentProps> = ({
  isWriting,
  updateFunc,
  document,
  user,
  postMutate,
  isComment,
  setIsComment,
}) => {
  const [isLiked, setIsLiked] = useState(
    document!.likes.some((like) => like.id === user?._id)
  );
  const [showAllComments, setShowAllComments] = useState(
    document?.comments.length! < 3
  );

  const reversedComments = document?.comments?.slice().reverse();

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
    if (documentId && user?._id) {
      likeUnlikeFunc({ documentId, userId: user?._id });
    }
  };

  const onShowComments = () => {
    setShowAllComments(!showAllComments);
  };

  useEffect(() => {
    postMutate();
  }, [likeUnlikeDocument]);

  return (
    <div className={`like-comment ${isWriting ? 'writing' : ''}`}>
      <div className="icons">
        <Icon
          onClick={onLikeClick}
          icon={isLiked ? likeIcon : likeOutlinedIcon}
          className={`like-icon ${isLiked ? 'active' : ''}`}
        />
      </div>
      <div className="like-text">
        <h1>
          {document?.likes.length
            ? `Liked by ${document.likes.length}`
            : 'Be the first to like!'}
        </h1>
      </div>
      <div className="comment-text">
        {showAllComments ? (
          <>
            <CommentForm
              document={document}
              user={user}
              postMutate={postMutate}
            />
            {reversedComments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <div
              onClick={() => {
                onShowComments();
              }}
              className="all-comments"
            >
              <p>Show less...</p>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                onShowComments();
              }}
              className="all-comments"
            >
              <p>View all {document?.comments.length} comments</p>
            </div>
            <CommentForm
              document={document}
              user={user}
              postMutate={postMutate}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LikeComment;
