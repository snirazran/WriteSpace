import './ProfileBox.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SecondaryBtn from './../Buttons/SecondaryBtn';
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  GetUserByIdDTO,
  UserResponseDTO,
} from 'api-client/users';
import ProfileStats from './ProfileStats';
import { useState } from 'react';
import FriendsList from '../Friends/FriendsList';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';

type ProfileBoxProps = {
  shownUser: GetUserByIdDTO | undefined;
  userFriends: GetAllUsersFriendsDTO | undefined;
  friendsMutate: KeyedMutator<AxiosResponse<GetAllUsersFriendsDTO, any>>;
};

const ProfileBox: React.FC<ProfileBoxProps> = ({
  shownUser,
  userFriends,
  friendsMutate,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isUserProfile = () => user?._id === shownUser?._id;

  const [showFriends, setShowFriends] = useState(false);

  let friendsArray: Array<UserResponseDTO> = [];
  if (userFriends) {
    friendsArray = userFriends.userFriends;
  }

  const onClick = () => {
    navigate(`/profile/edit/`);
  };

  return (
    <section className="profile">
      {showFriends && (
        <FriendsList
          friends={friendsArray}
          close={() => setShowFriends(false)}
          user={user}
          friendsMutate={friendsMutate}
        />
      )}
      <div className="profile-box">
        <div className="profile-details">
          <div className="profile-img">
            <img src={shownUser ? shownUser.img : 'User Img'} alt="" />
          </div>
          <h1>{shownUser ? shownUser.username : 'user'}</h1>
          <p>{shownUser ? shownUser.bio : 'User Bio'}</p>
        </div>
        {isUserProfile() ? (
          <div className="edit-btn" onClick={onClick}>
            <SecondaryBtn onClick={onClick} btnText={'Edit profile'} />
          </div>
        ) : (
          <></>
        )}
        <ProfileStats
          setShowFriends={setShowFriends}
          userFriends={friendsArray}
        />
      </div>
    </section>
  );
};

export default ProfileBox;
