import './FriendsSidebar.css';
import Friend from '../Friend';

function FriendsSidebar({
  content,
  user,
  userFriends,
  addRemoveFriend,
  setFriends,
}) {
  if (userFriends) {
    return (
      <div className="sidebar find-friends">
        <h1>Discover new friends</h1>
        {content?.map((friend) => (
          <Friend
            key={user?._id}
            user={user}
            friend={friend}
            userFriends={userFriends}
            setFriends={setFriends}
            addRemoveFriend={addRemoveFriend}
          />
        ))}
      </div>
    );
  }
}

export default FriendsSidebar;
