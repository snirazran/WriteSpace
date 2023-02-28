import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileBox from '../components/ProfileBox';
import Slider from '../components/Slider';
import Spinner from '../components/Spinner';
import './Projects.css';
import { getProjects, reset } from '../features/projects/projectSlice';

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { userId } = useParams();

  const { user } = useSelector((state) => state.auth);

  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProjects(userId));

    return () => {
      dispatch(reset);
    };
  }, [isError, message, dispatch, userId]);

  const onClick = () => {
    navigate('/projects/create');
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="projects">
      <ProfileBox />
      <Slider projects={projects} />
      <button onClick={onClick} className="box-btn">
        Create a new project
      </button>
    </section>
  );
}

export default Projects;
