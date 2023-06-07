import './ProfileBar.css';
import { useNavigate } from 'react-router-dom';
function ProfileBar({ user }) {
  const navigate = useNavigate();
  return (
    <div className="profile-bar">
      <div className="profile-bar-img">
        <img src={user && user.img} alt="" />
      </div>
      <h1>{user && user.username}</h1>
      <p>{user && user.bio}</p>
      <div className="profile-bar-stats">
        <div className="profile-bar-likes">
          <h1>{user && user.friends.length ? user.friends.length : 0}</h1>
          <p>Friends</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
