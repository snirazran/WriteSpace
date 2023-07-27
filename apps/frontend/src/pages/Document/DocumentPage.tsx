import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import './DocumentPage.css';
import DocumentBox from '../../components/Documents/DocumentBox';
import {
  useGetDocumentById,
  useDeleteDocument,
} from '../../features/documents/documentsApi';
function DocumentPage() {
  let { id } = useParams();
  const {
    data: post,
    error: postError,
    isLoading: postIsLoading,
    mutate: postMutate,
  } = useGetDocumentById(id!);

  useEffect(() => {
    if (postError) {
      console.log(postError.message);
    }
  }, [postError]);

  if (postIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="PostPage">
      <DocumentBox content={post?.data} deleteFunc={useDeleteDocument} />
    </section>
  );
}

export default DocumentPage;
