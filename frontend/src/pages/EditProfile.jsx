import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateUser, resetUser, getUser } from '../features/users/userSlice';
import Spinner from '../components/Spinner';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';
import { v4 } from 'uuid';
import placeHolder from '../media/placeholder.png';
import '../pages/Login_Register.css';

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userIsLoading, userIsError, userMessage } = useSelector(
    (state) => state.user
  );
  let { id } = useParams();

  useEffect(() => {
    if (userIsError) {
      toast.error(userMessage);
    }

    dispatch(getUser(id));

    return () => {
      dispatch(resetUser());
    };
  }, [userIsError, userMessage, dispatch, id]);

  //Functions to handle image upload
  const [imageFile, setImageFile] = useState(null);
  const [imageLocal, setImageLocal] = useState(null);

  const uploadImage = async () => {
    if (imageLocal === null) {
      return user.img;
    }
    if (imageLocal.includes('https://images.unsplash.com')) {
      return imageLocal;
    }
    const imageRef = ref(storage, `postImages/${imageFile.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) {
        return imageURL;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    username: user.username ? user.username : 'username',
    email: user.email,
    bio: user.bio,
  });

  const { username, bio, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const img = await uploadImage();
      const userData = {
        username,
        bio,
        email,
        img,
      };
      dispatch(updateUser({ id, userData }));
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  if (userIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          Edit profile<span></span>
        </h1>
      </section>

      <div className="register-photo">
        <label htmlFor="file-input">
          {imageLocal ? (
            <img src={imageLocal} alt="profile" />
          ) : (
            <img src={user.img} alt="profile" />
          )}
        </label>
        <input
          onChange={(e) => {
            setImageLocal(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
          }}
          id="file-input"
          type="file"
          key="file"
        />
        <div className="register-photo-text">
          <label htmlFor="file-input">
            <p>Pick a profile picture</p>
          </label>
        </div>
      </div>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="bio"
              className="form-control"
              id="bio"
              name="bio"
              value={bio}
              placeholder="Enter your bio"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
