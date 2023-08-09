import '../Register/Login_Register.css';
import EditProfileForm from './EditProfileForm';
import { useAuth } from '../../context/AuthContext';

const EditProfile: React.FC = () => {
  //get user from api
  const { user: loggedInUser, setUser } = useAuth();

  return (
    <>
      <section className="heading">
        <h1>Edit Profile</h1>
      </section>
      <div className="edit-profile-content">
        <EditProfileForm
          loggedInUser={loggedInUser ? loggedInUser : undefined}
          setUser={setUser}
        />
      </div>
    </>
  );
};

export default EditProfile;
