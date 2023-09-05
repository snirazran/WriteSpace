import { useParams } from 'react-router-dom';
import ProfileBox from '../../components/Profile/ProfileBox';
import Slider from '../../components/Project/Slider';
import Spinner from '../../components/Spinner';
import './Profile.css';
import { useGetUserById } from '../../features/users/usersApi';
import { useGetUserFriends } from '../../features/users/friendsApi';
import { useGetAllUserProjects } from '../../features/projects/ProjectsApi';
import { useEffect } from 'react';
const Profile: React.FC = () => {
  let { id } = useParams();

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
    mutate: userMutate,
  } = useGetUserById(id!, { refreshInterval: 5000, errorRetryCount: 5 });

  const {
    data: userFriends,
    error: userFriendsError,
    isLoading: userFriendsIsLoading,
    isValidating: isInitiallyLoading,
    mutate: userFriendsMutate,
  } = useGetUserFriends(id!, { refreshInterval: 5000, errorRetryCount: 5 });

  const {
    data: projects,
    error: projectError,
    isLoading: projectIsLoading,
    mutate: projectMutate,
  } = useGetAllUserProjects(id!, { refreshInterval: 5000, errorRetryCount: 5 });

  useEffect(() => {
    projectMutate();
  }, [projects]);

  if (userIsLoading || projectIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="profile-page">
      <ProfileBox
        friendsMutate={userFriendsMutate}
        shownUser={user?.data}
        userFriends={userFriends?.data}
        userProjects={projects?.data}
      />
      <Slider shownUser={user?.data} content={projects?.data} />
    </section>
  );
};

export default Profile;
