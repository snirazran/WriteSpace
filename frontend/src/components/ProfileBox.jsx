import './ProfileBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import SecondaryBtn from './Buttons/SecondaryBtn';

function ProfileBox({ shownUser, userFriends }) {
  const { user } = useSelector((state) => state.auth);
  const isUserProfile = () => {
    if (shownUser) {
      if (user._id === shownUser._id) {
        return true;
      }
    }
  };
  const navigate = useNavigate();
  let { id } = useParams();
  const onClick = () => {
    navigate(`/profile/edit/${shownUser._id}`);
  };
  return (
    <section className="profile">
      <div className="profile-box">
        <div className="profile-details">
          <div className="profile-img">
            <img src={shownUser ? shownUser.img : 'User Img'} alt="" />
          </div>

          <h1>{shownUser ? shownUser.username : 'user'}</h1>
          <p>{shownUser ? shownUser.bio : 'User Bio'}</p>
        </div>
        {isUserProfile() ? (
          <div className="edit-btn" onClick={onClick}>
            <SecondaryBtn id="profile-btn" btnText={'Edit profile'} />
          </div>
        ) : (
          <></>
        )}

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
