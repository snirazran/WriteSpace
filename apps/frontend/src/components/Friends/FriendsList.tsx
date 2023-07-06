import React from 'react';
import './FriendList.css';
import { UserResponseDTO } from 'api-client/users';

type FriendListProps = {
  friends: UserResponseDTO[];
  close: () => void;
};

const FriendList: React.FC<FriendListProps> = ({ friends, close }) => {
  return (
    <div className="friend-list-overlay" onClick={close}>
      <div className="friend-list" onClick={(e) => e.stopPropagation()}>
        <h1>Friend List</h1>
        <ul>
          {friends?.map((friend, index) => (
            <li key={friend._id}>{friend?.username}</li>
          ))}
        </ul>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default FriendList;
