import { FC, useEffect } from 'react';
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify';

import '../../pages/Login_Register.css';
import { useRegister } from '../../features/auth/useRegister';

const Register: FC = () => {
  const { error } = useRegister();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
