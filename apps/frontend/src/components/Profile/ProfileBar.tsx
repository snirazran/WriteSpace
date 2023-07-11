import { useState } from 'react';
import SecondaryBtn from '../Buttons/SecondaryBtn';
import './ProfileBar.css';
import { useNavigate } from 'react-router-dom';
import FriendsList from '../Friends/FriendsList';
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  UserDTO,
  UserResponseDTO,
} from 'api-client/users';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';
import ProfileStats from './ProfileStats';

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

  const onClick = () => {
    navigate(`/profile/${user?._id}`);
  };

  const onEditProfileClick = () => {
    navigate(`/profile/edit`);
  };

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
        <img onClick={onClick} src={user?.img} alt="" />
      </div>
      <div className="profile-bar-userinfo">
        <h1 onClick={onClick}>{user?.username}</h1>
        <p>{user?.bio}</p>
        <div className="profile-bar-edit-profile">
          <SecondaryBtn onClick={onEditProfileClick} btnText="Edit Profile" />
        </div>
      </div>
      <ProfileStats userFriends={userFriends} setShowFriends={setShowFriends} />
    </div>
  );
};

export default ProfileBar;
