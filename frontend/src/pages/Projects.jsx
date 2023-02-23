import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileBox from '../components/ProfileBox';
import Slider from '../components/Slider';
import './Projects.css';

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onClick = () => {
    navigate('/projects/create');
    window.scrollTo(0, 0);
  };

  return (
    <section className="projects">
      <ProfileBox />
      <Slider />
      <button onClick={onClick} className="box-btn">
        Create a new project
      </button>
    </section>
  );
}

export default Projects;
