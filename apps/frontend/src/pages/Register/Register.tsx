import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase';
import { v4 } from 'uuid';
import placeHolder from '../../media/placeholder.png';
import '../../pages/Login_Register.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const formItems = [
  {
    type: 'name',
    id: 'name',
    name: 'name',
    placeholder: 'Enter your name',
  },
  {
    type: 'email',
    id: 'email',
    name: 'email',
    placeholder: 'Enter your email',
  },
  {
    type: 'password',
    id: 'password',
    name: 'password',
    placeholder: 'Enter your password',
  },
  {
    type: 'password',
    id: 'confirmPassword',
    name: 'confirmPassword',
    placeholder: 'Confirm password',
  },
];

function Register() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Password do not match');
    } else {
      try {
        const img = await uploadImage();
        const userData = {
          username: data.name,
          email: data.email,
          password: data.password,
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {formItems.map(({ type, id, name, placeholder }) => (
            <div className="form-group" key={id}>
              <input
                className="form-control"
                type={type}
                id={id}
                placeholder={placeholder}
                {...registerForm(
                  name === 'name'
                    ? 'name'
                    : name === 'email'
                    ? 'email'
                    : name === 'password'
                    ? 'password'
                    : 'confirmPassword',
                  {
                    required: 'This field is required',
                  }
                )}
              />
            </div>
          ))}
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
