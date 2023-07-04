import './FriendsSidebar.css';
import Friend from '../Friend';
import { GetAllUsersDTO, UserResponseDTO } from 'api-client/users';
import { User } from '../../utils/user';
import { useAddRemoveFriend } from '../../features/users/friendsApi';

type FriendsSidebarProps = {
  content: GetAllUsersDTO | undefined;
  user: User | null;
  userFriends: UserResponseDTO[] | undefined;
};

const FriendsSidebar: React.FC<FriendsSidebarProps> = ({
  content,
  user: myUser,
  userFriends,
}) => {
  let userList = content?.users.filter((user) => user._id !== myUser?._id);
  if (userList?.length === 0)
    return (
      <div className="sidebar find-friends">
        <h1>Discover new friends</h1>
        <p>No users found</p>
      </div>
    );
  return (
    <div className="sidebar find-friends">
      <h1>Discover new friends</h1>
      {userList?.map((friend) => (
        <Friend
          key={myUser?._id}
          user={myUser}
          friend={friend}
          userFriends={userFriends}
        />
      ))}
    </div>
  );
};

export default FriendsSidebar;
