import { FC, useEffect } from 'react';
import RegisterForm from './RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { reset } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner';
import '../../pages/Login_Register.css';

const Register: FC = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();

  // TODO: clean up hooks from deps
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

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
      <RegisterForm />
    </>
  );
};

export default Register;
