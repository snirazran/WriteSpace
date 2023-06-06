import { toast } from 'react-toastify';
import '../Login_Register.css';
import EditProfileForm from './EditProfileForm';
import { useEffect } from 'react';
import { useGetUserById } from '../../features/users/usersApi';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toCapital } from '../../utils/toCapital';

function EditProfile() {
  //get id from url
  const { id } = useParams();

  //get user from api
  const { user: loggedInUser, setUser } = useAuth();
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
    mutate,
  } = useGetUserById(id!);

  useEffect(() => {
    //show error if failed to get user
    if (userError) {
      toast.error(userError.message);
    }
  }, [userError, userData]);

  const isEditMode = loggedInUser?._id === userData?.data?._id;

  return (
    <>
      <section className="heading">
        {isEditMode ? (
          <h1>Edit Profile</h1>
        ) : (
          <h1>
            {loggedInUser ? toCapital(loggedInUser?.username) : 'Username'}{' '}
            Profile
          </h1>
        )}
      </section>
      <EditProfileForm
        id={id}
        loggedInUser={loggedInUser ? loggedInUser : undefined}
        userData={userData?.data}
        userIsLoading={userIsLoading}
        isEditMode={isEditMode}
      />
    </>
  );
}

export default EditProfile;
