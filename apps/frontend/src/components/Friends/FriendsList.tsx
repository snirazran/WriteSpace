// Imports
import React from 'react';
import { AxiosResponse } from 'axios';
import { KeyedMutator } from 'swr';

// Local imports
import Friend from './Friend';
import SecondSmallBtn from '../Buttons/SecondSmallBtn';
import './FriendList.css';

// Types
import {
  GetAllUsersDTO,
  GetAllUsersFriendsDTO,
  UserDTO,
  UserResponseDTO,
} from 'api-client/users';

type FriendListProps = {
  friends: UserResponseDTO[];
  close: () => void;
  user: UserDTO | null;
  friendsMutate: KeyedMutator<AxiosResponse<GetAllUsersFriendsDTO, any>>;
  usersMutate?: KeyedMutator<AxiosResponse<GetAllUsersDTO, any>>;
};

const FriendList: React.FC<FriendListProps> = ({
  friends,
  close,
  user,
  friendsMutate,
  usersMutate,
}) => {
  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div className="friend-list-overlay" onClick={close}>
      <div className="friend-list" onClick={stopPropagation}>
        <h1>Friend List</h1>
        {!friends?.length && <p>No friends yet</p>}
        {friends?.map((friend, index) => (
          <Friend
            key={friend._id}
            userFriends={friends}
            friend={friend}
            user={user}
            friendsMutate={friendsMutate}
            usersMutate={usersMutate}
          />
        ))}
        <div className="friend-list-closebtn">
          <SecondSmallBtn onClick={close} text="Close" />
        </div>
      </div>
    </div>
  );
};

export default FriendList;
