import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Friend({ friend, userFriends, user, addRemoveFriend, setFriends }) {
  const API_URL = '/api/users/';
  const dispatch = useDispatch();
  let isFriend;
  const navigate = useNavigate();
  if (userFriends.length >= 1) {
    isFriend = userFriends.find((userFriend) => userFriend._id === friend._id);
  }

  const onClick = (id) => {
    navigate(`/projects/${friend._id}`);
    window.scrollTo(0, 0);
  };

  const id = user._id;
  const friendId = friend._id;
  const token = user.token;

  //get all users
  const patchFriend = async () => {
    const response = await dispatch(
      addRemoveFriend({ userId: id, friendId: friendId, token: token })
    );
    dispatch(setFriends({ friends: response }));
  };

  return (
    <div className="sidebar-row">
      <div className="friend-img">
        <img onClick={onClick} src={friend && friend.img} alt="img" />
      </div>
      <div className="friend-sidebar-right">
        <div onClick={onClick} className="sidebar-text">
          <h1>{friend && friend.username}</h1>
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
}

export default Friend;
