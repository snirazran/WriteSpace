import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import '../Login_Register.css';
import { useAuth } from '../../context/AuthContext';
import { useLogin } from '../../features/auth/useLogin';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => trigger(data);

  const formItems = [
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
  ];

  const { trigger, data: loginResponse, error, isLoading, reset } = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginResponse) {
      setUser(loginResponse);
      navigate('/');
    }
    reset();
  }, [navigate, reset, loginResponse]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          {formItems.map(({ type, id, name, placeholder }) => (
            <div className="form-group" key={id}>
              <input
                className="form-control"
                type={type}
                id={id}
                placeholder={placeholder}
                {...register(name === 'email' ? 'email' : 'password', {
                  required: 'This field is required',
                })}
              />
            </div>
          ))}
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
