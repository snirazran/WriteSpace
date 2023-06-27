import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import {
  getPost,
  resetPosts,
  deletePost,
} from '../../features/posts/postSlice';
import './DocumentPage.css';
import DocumentBox from '../../components/Documents/DocumentBox';
import BreadCrumbs from '../../components/Navigation/BreadCrumbs';

function DocumentPage() {
  const dispatch = useDispatch();

  let { id } = useParams();

  const { posts, postIsLoading, postIsError, postMessage } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (postIsError) {
      console.log(postMessage);
    }

    dispatch(getPost(id));

    return () => {
      dispatch(resetPosts());
    };
  }, [postIsError, postMessage, dispatch, id]);

  if (postIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="PostPage">
      <BreadCrumbs content={posts[0]}></BreadCrumbs>
      <DocumentBox content={posts[0]} deleteFunc={deletePost} />
    </section>
  );
}

export default DocumentPage;
