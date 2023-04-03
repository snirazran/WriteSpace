import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileBox from '../components/ProfileBox';
import Slider from '../components/Slider';
import Spinner from '../components/Spinner';
import './Projects.css';
import { getProjects, resetProjects } from '../features/projects/projectSlice';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  resetUser,
} from '../features/users/userSlice';
import { useGetAllusers } from '../features/users/useGetAllUsers';

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: allUsersData, isLoading, error } = useGetAllusers();
  console.log(allUsersData);

  let { userId } = useParams();

  const { projects, projectIsLoading, projectIsError, projectMessage } =
    useSelector((state) => state.projects);

  const { userList, userFriends, userIsLoading, userIsError, userMessage } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (projectIsError || userIsError) {
      console.log(projectIsError || userIsError);
    }

    dispatch(getProjects(userId));
    dispatch(getUser(userId));

    return () => {
      dispatch(resetUser());
      dispatch(resetProjects());
    };
  }, [
    projectIsError,
    userIsError,
    projectMessage,
    userMessage,
    dispatch,
    userId,
  ]);

  const onClick = () => {
    navigate('/projects/create');
    window.scrollTo(0, 0);
  };

  if (userIsLoading || projectIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="projects">
      <ProfileBox shownUser={userList[0]} userFriends={userFriends} />
      <Slider content={projects} />
      <button onClick={onClick} className="box-btn">
        Create a new project
      </button>
    </section>
  );
}

export default Projects;