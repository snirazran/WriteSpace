import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import './Login_Register.css';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../axios/useUser';

function Login() {
  const { user, setUser } = useAuth();
  const localUser = useUser()[0];
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  );

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state: { auth: any }) => state.auth
  );

  useEffect(() => {
    if (!localUser || !user) {
      setUser(localUser ? localUser : null);
      console.log('localUser', localUser, 'user', user);
    }
    if (user) {
      navigate('/');
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [localUser, user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          Welcome Back<span>!</span>
        </h1>
        <p>{`Write what's on your mind :)`}</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
          <div className="login-register">
            <p>
              Don’t have an account?{' '}
              <span>
                <Link to="/register">Sign up</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
