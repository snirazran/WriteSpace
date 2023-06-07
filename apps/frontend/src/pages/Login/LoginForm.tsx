import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginInputs } from './LoginTypes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLogin } from '../../features/auth/authApi';
import Spinner from '../../components/Spinner';

function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { trigger, data: loginResponse, error, reset, isLoading } = useLogin();

  useEffect(() => {
    if (loginResponse) {
      setUser(loginResponse.data);
      navigate('/');
    }
    reset();
  }, [navigate, reset, loginResponse]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => trigger(data);

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
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
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

export default LoginForm;
