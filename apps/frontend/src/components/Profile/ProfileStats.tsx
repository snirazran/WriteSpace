import { UserResponseDTO } from 'api-client/users';
import './ProfileStats.css';
type ProfileStatsProps = {
  setShowFriends: React.Dispatch<React.SetStateAction<boolean>>;
  userFriends: UserResponseDTO[];
};

const ProfileStats: React.FC<ProfileStatsProps> = ({
  setShowFriends,
  userFriends,
}) => {
  const onFriendsClick = () => {
    setShowFriends(true);
  };
  return (
    <div className="profile-bar-stats">
      <div className="profile-bar-projects">
        <h1>0</h1>
        <p>Projects</p>
      </div>
      <div onClick={onFriendsClick} className="profile-bar-friends">
        <h1>{userFriends?.length || '0'}</h1>
        <p>Friends</p>
      </div>
      <div className="profile-bar-likes">
        <h1>0</h1>
        <p>Likes</p>
      </div>
    </div>
  );
};

export default ProfileStats;
