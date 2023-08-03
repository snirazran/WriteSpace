import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import './DocumentPage.css';
import DocumentBox from '../../components/Documents/DocumentBox';
import {
  useGetDocumentById,
  useDeleteDocument,
} from '../../features/documents/documentsApi';
import { toast } from 'react-toastify';
function DocumentPage() {
  let { id } = useParams();

  const {
    data: post,
    error: postError,
    isLoading: postIsLoading,
    mutate: postMutate,
  } = useGetDocumentById(id!);

  const {
    data: deletedPost,
    error,
    isLoading: isMutating,
    reset,
    trigger,
  } = useDeleteDocument(id!);

  useEffect(() => {
    postMutate();
  }, []);

  useEffect(() => {
    if (postError) toast.error('Something went wrong');
  }, [postError]);

  if (postIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="PostPage">
      <DocumentBox
        content={post?.data}
        deleteFunc={trigger}
        postMutate={postMutate}
      />
    </section>
  );
}

export default DocumentPage;
