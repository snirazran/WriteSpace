import { useNavigate } from 'react-router-dom';
import { User } from '../../utils/user';
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  UserResponseDTO,
} from 'api-client/users';
import { useAddRemoveFriend } from '../../features/users/friendsApi';
import { useAuth } from '../../context/AuthContext';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import SecondaryBtn from '../Buttons/SecondaryBtn';

type FriendProps = {
  key: string | undefined;
  user: User | null;
  friend: UserResponseDTO | undefined;
  userFriends: UserResponseDTO[] | undefined;
  friendsMutate: KeyedMutator<AxiosResponse<GetAllUsersFriendsDTO, any>>;
  usersMutate: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
};

const Friend: React.FC<FriendProps> = ({
  friend,
  userFriends,
  user,
  friendsMutate,
  usersMutate,
}) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isFriend, setIsFriend] = useState(false);

  const id = user?._id;
  const friendId = friend?._id;

  const {
    data,
    error,
    isLoading: isMutating,
    reset,
    trigger,
  } = useAddRemoveFriend();

  const patchFriend = async () => {
    if (id && friendId) {
      await trigger({ id, friendId });
    }
  };

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
      usersMutate();
      friendsMutate();
    }
  }, [data]);

  useEffect(() => {
    if (userFriends) {
      const friend = userFriends.find((friend) => friend._id === friendId);
      if (friend) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    }
  }, [userFriends]);

  const onClick = () => {
    navigate(`/profile/${friend?._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="sidebar-row">
      <div className="friend-img">
        <img onClick={onClick} src={friend?.img} alt="img" />
      </div>
      <div className="friend-sidebar-right">
        <div onClick={onClick} className="sidebar-text">
          <h1>{friend?.username}</h1>
        </div>
        <div className="friend-sidebar-btn">
          {!isFriend ? (
            <SecondaryBtn onClick={patchFriend} btnText="Add Friend" />
          ) : (
            <SecondaryBtn onClick={patchFriend} btnText="Remove Friend" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
