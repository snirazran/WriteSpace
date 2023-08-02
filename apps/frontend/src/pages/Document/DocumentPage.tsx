import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import './DocumentPage.css';
import DocumentBox from '../../components/Documents/DocumentBox';
import {
  useGetDocumentById,
  useDeleteDocument,
} from '../../features/documents/documentsApi';
import MainBtn from '../../components/Buttons/MainBtn';
function DocumentPage() {
  let { id } = useParams();
  const {
    data: post,
    error: postError,
    isLoading: postIsLoading,
    mutate: postMutate,
  } = useGetDocumentById(id!);

  const {
    data,
    error,
    isLoading: isMutating,
    reset,
    trigger,
  } = useDeleteDocument(id!);

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
      <MainBtn btnText="Delete" onClick={() => trigger()} />
      <DocumentBox content={post?.data} deleteFunc={useDeleteDocument} />
    </section>
  );
}

export default DocumentPage;
