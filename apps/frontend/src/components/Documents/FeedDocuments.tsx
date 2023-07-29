import { useGetFeedPosts } from '../../features/documents/documentsApi';
import { DocumentResponseDTO } from 'api-client/documents';
import Document from './Document';
import Spinner from '../Spinner';

const FeedDocuments: React.FC = () => {
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
        <Document key={content._id} content={content} />
      ))}
    </>
  );
};

export default FeedDocuments;
