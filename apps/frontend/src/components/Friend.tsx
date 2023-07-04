import { useNavigate } from 'react-router-dom';
import { User } from '../utils/user';
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  UserResponseDTO,
} from 'api-client/users';
import { useAddRemoveFriend } from '../features/users/friendsApi';
import { useAuth } from '../context/AuthContext';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';

type FriendProps = {
  key: string | undefined;
  user: User | null;
  friend: UserResponseDTO | undefined;
  userFriends: UserResponseDTO[] | undefined;
  usersMutate: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
};

const Friend: React.FC<FriendProps> = ({
  friend,
  userFriends,
  user,
  usersMutate,
}) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const isFriend: UserResponseDTO | undefined = userFriends?.find(
    (userFriend) => userFriend._id === friend?._id
  );

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
      if (data?.data) {
        setUser(data.data);
        usersMutate();
      }
    }
  };

  console.log(friend);

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
            <button
              onClick={() => patchFriend()}
              className="sidebar-btn friends-btn"
            >
              Add Friend
            </button>
          ) : (
            <button
              onClick={() => patchFriend()}
              className="sidebar-btn friends-btn"
            >
              Remove Friend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
