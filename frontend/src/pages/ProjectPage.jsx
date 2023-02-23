import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '../components/Slider';
import './ProjectPage.css';
import ProjectBox from '../components/ProjectBox';

function ProjectPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onClick = () => {
    navigate('/scribble/create');
    window.scrollTo(0, 0);
  };

  return (
    <section className="ProjectPage">
      <ProjectBox author={`by ${user.name}`} />
      <Slider />
      <button onClick={onClick} className="box-btn">
        Create a new project
      </button>
    </section>
  );
}

export default ProjectPage;
