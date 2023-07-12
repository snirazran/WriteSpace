import './ProfileBox.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  GetUserByIdDTO,
  UserResponseDTO,
} from 'api-client/users';
import ProfileStats from './ProfileStats';
import { useEffect, useState } from 'react';
import FriendsList from '../Friends/FriendsList';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';
import ProfileBtn from '../Buttons/ProfileBtn';
import { useAddRemoveFriend } from '../../features/users/friendsApi';

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
  const isUserProfile = () => user?._id === shownUser?._id;
  const [showFriends, setShowFriends] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  let friendsArray: Array<UserResponseDTO> = [];
  if (userFriends) {
    friendsArray = userFriends.userFriends;
  }

  const {
    data,
    error,
    isLoading: isMutating,
    reset,
    trigger,
  } = useAddRemoveFriend();

  const patchFriend = async () => {
    if (user?._id && shownUser?._id && user._id !== shownUser._id) {
      const id = user._id;
      const friendId = shownUser._id;
      await trigger({ id, friendId });
    }
  };

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
      friendsMutate();
    }
  }, [data]);

  useEffect(() => {
    if (user?.friends.includes(shownUser?._id!)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [userFriends]);

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
          <div className="profile-name">
            <h1>{shownUser ? shownUser.username : 'user'}</h1>
            {isUserProfile() ? (
              <div className="edit-btn" onClick={onClick}>
                <ProfileBtn onClick={onClick} btnText={'Edit profile'} />
              </div>
            ) : (
              <>
                <div className="edit-btn">
                  {!isFriend ? (
                    <ProfileBtn onClick={patchFriend} btnText="Add Friend" />
                  ) : (
                    <ProfileBtn onClick={patchFriend} btnText="Remove Friend" />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <ProfileStats
          setShowFriends={setShowFriends}
          userFriends={friendsArray}
        />
        <div className="profile-bio">
          <p>{shownUser ? shownUser.bio : 'User Bio'}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileBox;
