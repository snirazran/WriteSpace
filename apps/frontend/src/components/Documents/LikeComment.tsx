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
import { useNavigate } from 'react-router-dom';

type LikeCommentProps = {
  isWriting?: boolean;
  document: DocumentResponseDTO | undefined;
  user: User | null;
  postMutate: () => void;
};

const LikeComment: React.FC<LikeCommentProps> = ({
  isWriting,
  document,
  user,
  postMutate,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(
    document?.likes.some((like) => like.id === user?._id)
  );
  const [showAllComments, setShowAllComments] = useState(
    document?.comments.length! < 3
  );

  const onClickNav = (id: string) => {
    navigate(`/profile/${id}`);
    window.scrollTo(0, 0);
  };

  const isFeedPage = window.location.pathname === '/';

  const onFeedPage = (id: string) => {
    navigate(`/document/${id}`);
    window.scrollTo(0, 0);
  };

  const reversedComments = document?.comments?.slice().reverse();
  const twoComments = reversedComments?.slice(0, 2);
  const reversedLikes = document?.likes?.slice().reverse();
  const twoLikes = reversedLikes?.slice(0, 2);

  const renderLikes = () => {
    if (reversedLikes?.length === 0) {
      return 'Be the first to like this post';
    }
    if (twoLikes?.length! <= 2 && reversedLikes?.length! <= 2) {
      return (
        <>
          {twoLikes?.map((like, index) => (
            <span
              onClick={() => {
                onClickNav(like.id);
              }}
              key={like.id}
            >
              {like.username}
              {index < twoLikes?.length - 1 && ', '}
            </span>
          ))}
          {' likes this post'}
        </>
      );
    }
    return (
      <>
        {twoLikes?.map((like, index) => (
          <span
            onClick={() => {
              onClickNav(like.id);
            }}
            key={like.id}
          >
            {like.username}
            {index < 1 && ', '}
          </span>
        ))}
        {` and ${reversedLikes?.length! - 2} more likes this post`}
      </>
    );
  };

  const getTextMarginLeft = () => {
    if (document?.likes.length === 0) return '0px';
    if (document?.likes.length === 1) return '7px';
    if (document?.likes.length === 2) return '15px';
    return '15px';
  };

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
      <div className="like-section">
        <div
          className="like-img"
          style={{ display: document?.likes.length === 0 ? 'none' : 'flex' }}
        >
          {twoLikes?.map((like) => (
            <img
              onClick={() => {
                onClickNav(like.id);
              }}
              key={like.id}
              src={like.img}
              alt=""
            />
          ))}
        </div>

        <div className="like-text" style={{ marginLeft: getTextMarginLeft() }}>
          <h1>{renderLikes()}</h1>
        </div>
      </div>
      <div className="comment-text">
        {document?.comments.length !== 1 && showAllComments ? (
          <>
            <CommentForm
              document={document}
              user={user}
              postMutate={postMutate}
            />
            {reversedComments?.length ? (
              <>
                {reversedComments.map((comment) => (
                  <Comment
                    key={comment.id}
                    document={document}
                    postMutate={postMutate}
                    user={user}
                    comment={comment}
                  />
                ))}
                {reversedComments?.length > 2 ? (
                  <div
                    onClick={() => {
                      onShowComments();
                    }}
                    className="all-comments"
                  >
                    <p>Show less...</p>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="no-comments">
                <p>No comments yet...</p>
              </div>
            )}
          </>
        ) : (
          <>
            <CommentForm
              document={document}
              user={user}
              postMutate={postMutate}
            />
            {twoComments?.length ? (
              twoComments.map((comment) => (
                <Comment
                  key={comment.id}
                  document={document}
                  postMutate={postMutate}
                  user={user}
                  comment={comment}
                />
              ))
            ) : (
              <div className="no-comments">
                <p>No comments yet...</p>
              </div>
            )}
            {document?.comments.length! > 2 ? (
              <div
                onClick={() => {
                  isFeedPage ? onFeedPage(document?._id!) : onShowComments();
                }}
                className="all-comments"
              >
                <p>View all {document?.comments.length} comments</p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default LikeComment;
