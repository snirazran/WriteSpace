import './FriendsSidebar.css';
import Friend from '../Friend';
import { GetAllUsersDTO, UserResponseDTO } from 'api-client/users';
import { User } from '../../utils/user';

import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';

type FriendsSidebarProps = {
  content: GetAllUsersDTO | undefined;
  user: User | null;
  userFriends: UserResponseDTO[] | undefined;
  usersMutate: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
};

const FriendsSidebar: React.FC<FriendsSidebarProps> = ({
  content,
  user: myUser,
  userFriends,
  usersMutate,
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
          usersMutate={usersMutate}
        />
      ))}
    </div>
  );
};

export default FriendsSidebar;
