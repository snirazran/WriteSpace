import { UserDTO } from '../../../../user-service/src/dtos/user.dto';
import SecondaryBtn from '../Buttons/SecondaryBtn';
import './ProfileBar.css';
import { useNavigate } from 'react-router-dom';

type ProfileBarProps = {
  user: UserDTO | null;
};

const ProfileBar: React.FC<ProfileBarProps> = ({ user }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/profile/${user?._id}`);
  };

  const onEditProfileClick = () => {
    navigate(`/profile/edit`);
  };

  return (
    <div className="profile-bar">
      <div className="profile-bar-img">
        <img onClick={onClick} src={user?.img} alt="" />
      </div>
      <div className="profile-bar-userinfo">
        <h1 onClick={onClick}>{user?.username}</h1>
        <p>{user?.bio}</p>
        <div className="profile-bar-edit-profile">
          <SecondaryBtn onClick={onEditProfileClick} btnText="Edit Profile" />
        </div>
      </div>
      <div className="profile-bar-stats">
        <div className="profile-bar-friends">
          <h1>{user?.friends.length ? user.friends.length : 0}</h1>
          <p>Friends</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
