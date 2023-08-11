import {
  useGetFeedFriendsPosts,
  useGetFeedPosts,
} from '../../features/documents/documentsApi';
import { DocumentResponseDTO } from 'api-client/documents';
import Document from './Document';
import Spinner from '../Spinner';
import { User } from '../../utils/user';
import { useEffect, useState } from 'react';
import './FeedDocuments.css';

type FeedDocumentsProps = {
  user: User | null;
};

const FeedDocuments: React.FC<FeedDocumentsProps> = ({ user }) => {
  const [forYouActive, setforYouActive] = useState(true);
  const [friendsActive, setFriendsActive] = useState(false);

  const {
    data: feedPosts,
    error: feedPostsError,
    isLoading: feedPostsLoading,
    isInitiallyLoading: feedPostsInitiallyLoading,
    mutate: feedPostsMutate,
  } = useGetFeedPosts();

  const {
    data: feedFriendsPosts,
    error: feedFriendsPostsError,
    isLoading: feedFriendsPostsLoading,
    mutate: feedFriendsPostsMutate,
  } = useGetFeedFriendsPosts(user?._id!);

  let forYouPostsArray: Array<DocumentResponseDTO> = [];
  let friendsPostsArray: Array<DocumentResponseDTO> = [];

  const [forYouPosts, setForYouPosts] = useState<DocumentResponseDTO[] | null>(
    null
  );

  const [friendsPosts, setFriendsPosts] = useState<
    DocumentResponseDTO[] | null
  >(null);

  const renderFriendsPosts = () => {
    if (user?.friends?.length === 0) {
      return <h1>Please add some friends</h1>;
    }
    if (friendsPosts?.length === 0) {
      return <h1>No friends posts yet...</h1>;
    }
    return (
      <>
        {friendsPosts?.map((content) => (
          <Document
            postMutate={feedPostsMutate}
            key={content._id}
            content={content}
            user={user}
          />
        ))}
      </>
    );
  };

  useEffect(() => {
    if (!feedPosts) return;
    forYouPostsArray = feedPosts.data.documents.reverse();
    setForYouPosts(forYouPostsArray);
    if (!feedFriendsPosts) return;
    friendsPostsArray = feedFriendsPosts.data.documents.reverse();
    setFriendsPosts(friendsPostsArray);
  }, [feedPosts, feedFriendsPosts]);

  const onForYouClick = () => {
    setforYouActive(true);
    setFriendsActive(false);
  };

  const onFriendsClick = () => {
    setforYouActive(false);
    setFriendsActive(true);
  };

  if (feedPostsLoading || feedFriendsPostsLoading) {
    return <Spinner />;
  }

  if (!feedPosts) {
    return <h1>No posts available</h1>;
  }

  return (
    <>
      <div className="feed-document-selector">
        <div
          onClick={onForYouClick}
          className={`feed-document-selector-box ${
            forYouActive ? 'active' : ''
          }`}
        >
          <h1>For You</h1>
        </div>
        <div
          onClick={onFriendsClick}
          className={`feed-document-selector-box ${
            friendsActive ? 'active' : ''
          }`}
        >
          <h1>Friends</h1>
        </div>
      </div>
      {forYouActive ? (
        <>
          {forYouPosts?.map((content) => (
            <Document
              postMutate={feedPostsMutate}
              key={content._id}
              content={content}
              user={user}
            />
          ))}
        </>
      ) : (
        <> {renderFriendsPosts()}</>
      )}
    </>
  );
};

export default FeedDocuments;
