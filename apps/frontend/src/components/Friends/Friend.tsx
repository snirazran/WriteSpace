// Imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

// Local imports
import SecondaryBtn from '../Buttons/SecondaryBtn';
import { useAddRemoveFriend } from '../../features/users/friendsApi';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../utils/user';

// Types
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  UserResponseDTO,
} from 'api-client/users';
import { KeyedMutator } from 'swr';

type FriendProps = {
  key: string | undefined;
  user: User | null;
  friend: UserResponseDTO | undefined;
  userFriends: UserResponseDTO[] | undefined;
  friendsMutate: KeyedMutator<AxiosResponse<GetAllUsersFriendsDTO, any>>;
  usersMutate?: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
};

const Friend: React.FC<FriendProps> = ({
  friend,
  userFriends,
  user,
  friendsMutate,
  usersMutate,
}) => {
  // States
  const [isFriend, setIsFriend] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    data,
    error,
    isLoading: isMutating,
    reset,
    trigger,
  } = useAddRemoveFriend();

  // Variables
  const id = user?._id;
  const friendId = friend?._id;

  // Functions
  const patchFriend = async () => {
    if (id && friendId) {
      await trigger({ id, friendId });
    }
  };

  const onClick = () => {
    navigate(`/profile/${friend?._id}`);
    window.scrollTo(0, 0);
  };

  // Effects
  useEffect(() => {
    if (data?.data && friendsMutate) {
      setUser(data.data);
      friendsMutate();
    }
    if (data?.data && usersMutate) {
      setUser(data.data);
      usersMutate();
    }
  }, [data]);

  useEffect(() => {
    if (user?.friends.includes(friendId!)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [userFriends]);

  // Main render
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
          {friendId !== id && (
            <SecondaryBtn
              onClick={patchFriend}
              btnText={isFriend ? 'Remove Friend' : 'Add Friend'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
