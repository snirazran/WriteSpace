import './ProfileBox.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SecondaryBtn from './../Buttons/SecondaryBtn';
import {
  GetAllUsersFriendsDTO,
  GetUserByIdDTO,
  UserResponseDTO,
} from 'api-client/users';

type ProfileBoxProps = {
  shownUser: GetUserByIdDTO | undefined;
  userFriends: GetAllUsersFriendsDTO | undefined;
};

const ProfileBox: React.FC<ProfileBoxProps> = ({ shownUser, userFriends }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isUserProfile = () => user?._id === shownUser?._id;

  let friendsArray: Array<UserResponseDTO> = [];
  if (userFriends) {
    friendsArray = userFriends.userFriends;
  }

  const onClick = () => {
    navigate(`/profile/edit/`);
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
            <SecondaryBtn onClick={onClick} btnText={'Edit profile'} />
          </div>
        ) : (
          <></>
        )}
        <div className="profile-stats">
          <div className="profile-stat">
            <h1>{userFriends ? friendsArray.length : '0'}</h1>
            <p>Friends</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBox;
