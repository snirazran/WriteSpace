// Imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';

// Local imports
import './ProfileBox.css';
import { useAuth } from '../../context/AuthContext';
import ProfileBtn from '../Buttons/ProfileBtn';
import ProfileStats from './ProfileStats';
import FriendsList from '../Friends/FriendsList';
import { useAddRemoveFriend } from '../../features/users/friendsApi';

// Types
import {
  GetAllUsersFriendsDTO,
  GetUserByIdDTO,
  UserResponseDTO,
} from 'api-client/users';

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
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [showFriends, setShowFriends] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  let friendsArray: Array<UserResponseDTO> = userFriends
    ? userFriends.userFriends
    : [];
  const { data, trigger } = useAddRemoveFriend();

  const isUserProfile = () => user?._id === shownUser?._id;

  const navigateToEditProfile = () => navigate(`/profile/edit/`);
  const patchFriend = async () => {
    const userId = user?._id;
    const friendId = shownUser?._id;

    if (userId && friendId && userId !== friendId) {
      await trigger({ id: userId, friendId });
    }
  };

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
      friendsMutate();
    }
  }, [data]);

  useEffect(() => {
    setIsFriend(user?.friends?.includes(shownUser?._id!) || false);
  }, [userFriends]);

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
            <img src={shownUser?.img ?? 'User Img'} alt="User" />
          </div>

          <div className="profile-name">
            <h1>{shownUser?.username ?? 'user'}</h1>

            <div className="edit-btn">
              {isUserProfile() ? (
                <ProfileBtn
                  onClick={navigateToEditProfile}
                  btnText="Edit profile"
                />
              ) : (
                <ProfileBtn
                  onClick={patchFriend}
                  btnText={isFriend ? 'Remove Friend' : 'Add Friend'}
                />
              )}
            </div>
          </div>
        </div>

        <ProfileStats
          setShowFriends={setShowFriends}
          userFriends={friendsArray}
        />

        <div className="profile-bio">
          <p>{shownUser?.bio ?? 'User Bio'}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileBox;
