import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import ProfileBox from '../../components/Profile/ProfileBox';
import Slider from '../../components/Slider';
import Spinner from '../../components/Spinner';
import './Profile.css';
import { useGetUserById } from '../../features/users/usersApi';
import { useGetUserFriends } from '../../features/users/friendsApi';
import { useGetAllUserProjects } from '../../features/projects/ProjectsApi';
const Profile: React.FC = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
    mutate: userMutate,
  } = useGetUserById(id!);

  const {
    data: userFriends,
    error: userFriendsError,
    isLoading: userFriendsIsLoading,
    isValidating: isInitiallyLoading,
    mutate: userFriendsMutate,
  } = useGetUserFriends(id!);

  const {
    data: projects,
    error: projectError,
    isLoading: projectIsLoading,
    mutate: projectMutate,
  } = useGetAllUserProjects(id!);

  if (userIsLoading || projectIsLoading) {
    return <Spinner />;
  }

  return (
    <section className="projects">
      <ProfileBox shownUser={user?.data} userFriends={userFriends?.data} />
      <Slider shownUser={user?.data} content={projects?.data} />
    </section>
  );
};

export default Profile;
