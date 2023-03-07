import './ProfileBox.css';
import { Link, useNavigate } from 'react-router-dom';

import profilePhoto from '../media/friend.png';
import SecondaryBtn from './Buttons/SecondaryBtn';

function ProfileBox({ user, userFriends }) {
  return (
    <section className="profile">
      <div className="profile-box">
        <div className="profile-details">
          <img src={user ? user.img : 'User Img'} alt="" />
          <h1>{user ? user.username : 'user'}</h1>
          <p>{user ? user.bio : 'User Bio'}</p>
        </div>
        <SecondaryBtn id="profile-btn" btnText={'Edit profile'} />
        <div className="profile-stats">
          <div className="profile-stat">
            <h1>{userFriends ? userFriends.length : 0}</h1>
            <p>Friends</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileBox;
