import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import Slider from '../components/Slider';
import './ProjectPage.css';
import ProjectBox from '../components/ProjectBox';
import {
  getProject,
  resetProjects,
  deleteProject,
} from '../features/projects/projectSlice';
import { getProjectPosts, resetPosts } from '../features/posts/postSlice';

function ProjectPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  const { projects, projectIsLoading, projectIsError, projectMessage } =
    useSelector((state) => state.projects);
  const { posts, postIsLoading, postIsError, postMessage } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (postIsError || projectIsError) {
      console.log(projectMessage || postMessage);
    }

    dispatch(getProject(id));
    dispatch(getProjectPosts(id));

    return () => {
      dispatch(resetProjects());
      dispatch(resetPosts());
    };
  }, [postIsError, projectIsError, postMessage, projectMessage, dispatch, id]);

  const onClick = () => {
    navigate('/posts/create', { state: { projectId: id } });
    window.scrollTo(0, 0);
  };

  if (projectIsLoading || postIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="ProjectPage">
      <ProjectBox content={projects} deleteFunc={deleteProject} />
      <Slider content={posts} />
      <button onClick={onClick} className="box-btn">
        Create a new post
      </button>
    </section>
  );
}

export default ProjectPage;
