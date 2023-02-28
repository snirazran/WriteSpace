import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import Slider from '../components/Slider';
import './ProjectPage.css';
import ProjectBox from '../components/ProjectBox';
import { getProjects, reset } from '../features/projects/projectSlice';

function ProjectPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProjects());

    return () => {
      dispatch(reset);
    };
  }, [isError, message, dispatch]);

  const onClick = () => {
    navigate('/scribble/create');
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="ProjectPage">
      <ProjectBox author={`by ${user.name}`} />
      <Slider projects={projects} />
      <button onClick={onClick} className="box-btn">
        Create a new project
      </button>
    </section>
  );
}

export default ProjectPage;
