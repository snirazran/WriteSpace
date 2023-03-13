import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getPost, resetPosts, deletePost } from '../features/posts/postSlice';
import './PostPage.css';
import ProjectBox from '../components/ProjectBox';
import PostBox from '../components/PostBox';

function PostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();

  const { posts, postIsLoading, postIsError, postMessage } = useSelector(
    (state) => state.posts
  );
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
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
      <ProjectBox content={posts} deleteFunc={deletePost} />
      <PostBox content={posts} />
    </section>
  );
}

export default PostPage;
