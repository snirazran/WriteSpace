import { useGetFeedPosts } from '../../features/documents/documentsApi';
import { DocumentResponseDTO } from 'api-client/documents';
import Document from './Document';
import Spinner from '../Spinner';
import { User } from '../../utils/user';

type FeedDocumentsProps = {
  user: User | null;
};

const FeedDocuments: React.FC<FeedDocumentsProps> = ({ user }) => {
  const {
    data: feedPosts,
    error: feedPostsError,
    isLoading: feedPostsLoading,
    isInitiallyLoading: feedPostsInitiallyLoading,
    mutate: feedPostsMutate,
  } = useGetFeedPosts();

  let feedPostsArray: Array<DocumentResponseDTO> = [];
  if (feedPostsLoading) {
    return <Spinner />;
  }

  if (!feedPosts) {
    return <h1>No posts available</h1>;
  }

  feedPostsArray = feedPosts.data.documents;

  return (
    <>
      {feedPostsArray?.map((content) => (
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

export default FeedDocuments;
