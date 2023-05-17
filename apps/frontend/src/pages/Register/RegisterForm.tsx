import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { UploadImage } from '../../components';
import { register } from '../../features/auth/authSlice';
import storage from '../../firebase';
import '../../pages/Login_Register.css';
import { RegisterForm, RegistrationFormItem } from './RegisterTypes';

const RegisterForm: FC = () => {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        if (!data.profileImage[0]) toast.error('Please upload a profile image');
        const img = await uploadImage(data.profileImage[0]);
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
      type: 'file',
      id: 'file-input',
      name: 'profileImage',
      placeholder: 'Pick a profile picture',
      render: ({ name, ...rest }) => (
        <UploadImage
          name={name}
          alt="profile"
          register={registerForm}
          {...rest}
        />
      ),
    },
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
