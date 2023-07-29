// Imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

type ProfileBarProps = {
  user: UserDTO | null;
  userFriends: UserResponseDTO[];
  friendsMutate: KeyedMutator<AxiosResponse<GetAllUsersFriendsDTO, any>>;
  usersMutate: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
};

const ProfileBar: React.FC<ProfileBarProps> = ({
  user,
  userFriends,
  friendsMutate,
  usersMutate,
}) => {
  const navigate = useNavigate();
  const [showFriends, setShowFriends] = useState(false);

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
      <div className="profile-bar-img">
        <img onClick={navigateToUser} src={user?.img} alt="" />
      </div>
      <div className="profile-bar-userinfo">
        <h1 onClick={navigateToUser}>{user?.username}</h1>
        <p>{user?.bio}</p>
        <div className="profile-bar-edit-profile">
          <SecondaryBtn
            onClick={navigateToEditProfile}
            btnText="Edit Profile"
          />
        </div>
      </div>
      <ProfileStats userFriends={userFriends} setShowFriends={setShowFriends} />
    </div>
  );
};

export default ProfileBar;
