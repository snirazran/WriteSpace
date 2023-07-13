import React from 'react';
import Friend from '../Friends/Friend';
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  UserResponseDTO,
} from 'api-client/users';
import { User } from '../../utils/user';
import { KeyedMutator } from 'swr';
import { AxiosResponse } from 'axios';
import './FriendsSidebar.css';

type FriendsSidebarProps = {
  content: GetAllUsersDTO | undefined;
  user: User | null;
  userFriends: UserResponseDTO[] | undefined;
  friendsMutate: KeyedMutator<AxiosResponse<GetAllUsersFriendsDTO, any>>;
  usersMutate: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
};

const FriendsSidebar: React.FC<FriendsSidebarProps> = ({
  content,
  user: myUser,
  userFriends,
  friendsMutate,
  usersMutate,
}) => {
  const filteredUserList = content?.users
    .filter((user) => user._id !== myUser?._id)
    .slice(0, 5);

  if (!filteredUserList?.length)
    return (
      <div className="sidebar find-friends">
        <h1>Find Inspiration</h1>
        <p>No users found</p>
      </div>
    );

  return (
    <div className="sidebar find-friends">
      <h1>Find Inspiration</h1>
      {filteredUserList?.map((friend) => (
        <Friend
          key={friend._id}
          user={myUser}
          friend={friend}
          userFriends={userFriends}
          friendsMutate={friendsMutate}
          usersMutate={usersMutate}
        />
      ))}
    </div>
  );
};

export default FriendsSidebar;
