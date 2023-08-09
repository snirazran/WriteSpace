// Imports
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';

// Local imports
import SecondaryBtn from '../Buttons/SecondaryBtn';
import FriendsList from '../Friends/FriendsList';
import ProfileStats from './ProfileStats';
import './ProfileBar.css';

// Types
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  UserDTO,
  UserResponseDTO,
} from 'api-client/users';
import { GetAllUserProjectsDTO, ProjectResponseDTO } from 'api-client/projects';
import ProjectList from '../Project/ProjectList';

type ProfileBarProps = {
  user: UserDTO | null;
  userFriends: UserResponseDTO[];
  friendsMutate: KeyedMutator<AxiosResponse<GetAllUsersFriendsDTO, any>>;
  usersMutate: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
  userProjects: GetAllUserProjectsDTO | undefined;
};

const ProfileBar: React.FC<ProfileBarProps> = ({
  user,
  userFriends,
  friendsMutate,
  usersMutate,
  userProjects,
}) => {
  const navigate = useNavigate();
  const [showFriends, setShowFriends] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const navigateToUser = () => navigate(`/profile/${user?._id}`);
  const navigateToEditProfile = () => navigate(`/profile/edit`);

  return (
    <div className="profile-bar">
      {showFriends && (
        <FriendsList
          friends={userFriends}
          close={() => setShowFriends(false)}
          user={user}
          friendsMutate={friendsMutate}
          usersMutate={usersMutate}
        />
      )}
      {showProjects && (
        <ProjectList
          user={user}
          userProjects={userProjects}
          close={() => setShowProjects(false)}
        />
      )}
      <div className="profile-bar-img">
        <img onClick={navigateToUser} src={user?.img} alt="" />
      </div>
      <div className="profile-bar-userinfo">
        <h1 onClick={navigateToUser}>{user?.username}</h1>
        {user?.bio ? (
          <p>{user?.bio}</p>
        ) : (
          <>
            <div className="add-bio">
              <Link to="/profile/edit">
                <p>Add a bio...</p>
              </Link>
            </div>
          </>
        )}
        <div className="profile-bar-edit-profile">
          <SecondaryBtn
            onClick={navigateToEditProfile}
            btnText="Edit Profile"
          />
        </div>
      </div>
      <ProfileStats
        user={user}
        userFriends={userFriends}
        userProjects={userProjects}
        setShowFriends={setShowFriends}
        setShowProjects={setShowProjects}
      />
    </div>
  );
};

export default ProfileBar;
