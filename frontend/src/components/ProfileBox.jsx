import './ProfileBox.css';
import profilePhoto from '../media/friend.png';
import SecondaryBtn from './Buttons/SecondaryBtn';
function ProfileBox() {
  return (
    <section className="profile">
      <div className="profile-box">
        <div className="profile-details">
          <img src={profilePhoto} alt="" />
          <h1>Snir Azran</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Mauris et quis nisl egestas.
          </p>
        </div>
        <SecondaryBtn id="profile-btn" btnText={'Edit profile'} />
        <div className="profile-stats">
          <div className="profile-stat">
            <h1>40</h1>
            <p>Followers</p>
          </div>
          <div className="profile-stat">
            <h1>20</h1>
            <p>Following</p>
          </div>
          <div className="profile-stat">
            <h1>130</h1>
            <p>Likes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileBox;
