import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './PostPage.css';
import ProjectBox from '../components/ProjectBox';
import ScribbleBox from '../components/ScribbleBox';

function PostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  return (
    <section className="ProjectPage">
      <ProjectBox author={`by ${user.name}`} />
      <ScribbleBox />
    </section>
  );
}

export default PostPage;
