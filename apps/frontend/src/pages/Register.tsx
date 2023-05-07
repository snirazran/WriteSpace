import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebase';
import { v4 } from 'uuid';
import placeHolder from '../media/placeholder.png';
import '../pages/Login_Register.css';

interface FormValues {
  username: string;
  email: string;
  password: string;
  password2: string;
}

function Register() {
  const [formData, setFormData] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  //Functions to handle image upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLocal, setImageLocal] = useState<string | null>(null);

  const uploadImage = async () => {
    if (imageLocal === null) {
      return imageLocal;
    }
    if (imageLocal.includes('https://images.unsplash.com')) {
      return imageLocal;
    }
    const imageRef = ref(storage, `postImages/${imageFile!.name + v4()}`);
    try {
      await uploadBytes(imageRef, imageFile!);
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) {
        return imageURL;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password do not match');
    } else {
      try {
        const img = await uploadImage();
        const userData = {
          username,
          email,
          password,
          img,
        };
        dispatch(register(userData));
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          Hello<span>!</span>
        </h1>
        <p>Create a free account with your email.</p>
      </section>

      <div className="register-photo">
        <label htmlFor="file-input">
          {imageLocal ? (
            <img src={imageLocal} alt="profile" />
          ) : (
            <img src={placeHolder} alt="profile" />
          )}
        </label>
        <input
          onChange={(e) => {
            setImageLocal(URL.createObjectURL(e.target.files![0]));
            setImageFile(e.target.files![0]);
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
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Register
            </button>
          </div>
          <div className="login-register">
            <p>
              Already have an account?{' '}
              <span>
                <Link to="/login">Sign in</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
