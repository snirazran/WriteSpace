import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileBox from '../components/ProfileBox';
import Slider from '../components/Slider';
import Spinner from '../components/Spinner';
import './Projects.css';
import { getProjects, resetProjects } from '../features/projects/projectSlice';
import { useGetUserById } from '../features/users/usersApi';
import { useGetUserFriends } from '../features/users/friendsApi';

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { userId } = useParams();
  // const {
  //   data: user,
  //   error: userError,
  //   isLoading: userIsLoading,
  //   mutate: mutateUser,
  // } = useGetUserById(userId);
  const {
    data: userFriends,
    error: userFriendsError,
    isLoading: userFriendsIsLoading,
    mutate: mutateUserFriends,
  } = useGetUserFriends(userId);

  console.log(userFriends);

  const { projects, projectIsLoading, projectIsError, projectMessage } =
    useSelector((state) => state.projects);

  // useEffect(() => {
  //   if (projectIsError || userError || userFriendsError) {
  //     console.log(projectIsError || error);
  //   }

  //   dispatch(getProjects(userId));

  //   return () => {
  //     dispatch(resetProjects());
  //   };
  // }, [projectIsError, projectMessage, dispatch, userId]);

  const onClick = () => {
    navigate('/projects/create');
    window.scrollTo(0, 0);
  };

  // if (userIsLoading || userFriendsIsLoading || projectIsLoading) {
  //   return <Spinner />;
  // }

  return (
    <section className="projects">
      {/* <ProfileBox shownUser={user} userFriends={userFriends} /> */}
      <Slider content={projects} />
      <button onClick={onClick} className="box-btn">
        Create a new project
      </button>
    </section>
  );
}

export default Projects;
