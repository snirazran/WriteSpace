import React from 'react';
import { UserResponseDTO } from 'api-client/users';
import './ProfileStats.css';
import { User } from '../../utils/user';
import { useGetUserLikes } from '../../features/users/usersApi';
import { GetAllUserProjectsDTO } from 'api-client/projects';

type ProfileStatsProps = {
  setShowFriends: React.Dispatch<React.SetStateAction<boolean>>;
  setShowProjects: React.Dispatch<React.SetStateAction<boolean>>;
  userFriends: UserResponseDTO[];
  user: User | null;
  userProjects: GetAllUserProjectsDTO | undefined;
};

const ProfileStats: React.FC<ProfileStatsProps> = ({
  setShowFriends,
  userFriends,
  user,
  setShowProjects,
  userProjects,
}) => {
  const { data, error, isLoading, mutate } = useGetUserLikes(user?._id!);

  return (
    <div className="profile-bar-stats">
      <div
        onClick={() => setShowProjects(true)}
        className="profile-bar-projects"
      >
        <h1>{userProjects?.projects.length || '0'}</h1>
        <p>Projects</p>
      </div>
      <div onClick={() => setShowFriends(true)} className="profile-bar-friends">
        <h1>{userFriends?.length || '0'}</h1>
        <p>Friends</p>
      </div>
      <div className="profile-bar-likes">
        <h1>{data?.data.totalLikes || '0'}</h1>
        <p>Likes</p>
      </div>
    </div>
  );
};

export default ProfileStats;
