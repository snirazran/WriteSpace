import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { UploadImage } from '../../components';
import storage from '../../firebase';
import './Login_Register.css';
import { RegisterForm, RegistrationFormItem } from './RegisterTypes';
import { useRegister } from '../../features/auth/authApi';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    trigger,
    data: registerResponse,
    reset,
    isLoading,
    error: registerError,
  } = useRegister();

  useEffect(() => {
    if (registerResponse) {
      setUser(registerResponse.data);
      navigate('/');
    }
    reset();
  }, [navigate, reset, registerResponse]);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<RegisterForm>();

  const uploadImage = async (file: File) => {
    const imageRef = ref(storage, `postImages/${file!.name + v4()}`);
    try {
      await uploadBytes(imageRef, file!);
      const imageURL = await getDownloadURL(imageRef);
      if (imageURL) {
        return imageURL;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const userData = {
          username: data.name,
          email: data.email,
          password: data.password,
        };
        trigger(userData);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  const renderInput = ({
    id,
    name,
    type,
    placeholder,
    registerOptions,
  }: RegistrationFormItem) => {
    return (
      <input
        className="form-control"
        type={type}
        id={id}
        placeholder={placeholder}
        {...registerForm(name, { required: true, ...registerOptions })}
      />
    );
  };

  const formItems: RegistrationFormItem[] = [
    {
      type: 'name',
      id: 'name',
      name: 'name',
      placeholder: 'Enter your name',
      render: renderInput,
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      placeholder: 'Enter your email',
      render: renderInput,
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      placeholder: 'Enter your password',
      render: renderInput,
    },
    {
      type: 'password',
      id: 'confirmPassword',
      name: 'confirmPassword',
      placeholder: 'Confirm password',
      render: renderInput,
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {formItems.map(({ id, render, ...item }) => (
          <div className="form-group" key={id}>
            {render?.({ id, ...item })}
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
  );
};

export default RegisterForm;
