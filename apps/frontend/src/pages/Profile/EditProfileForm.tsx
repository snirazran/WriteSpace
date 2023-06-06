import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { UploadImage } from '../../components';
import storage from '../../firebase';
import '../Login_Register.css';
import { EditProfileForm, EditProfileFormItem } from './EditProfileTypes';
import { useUpdateUser } from '../../features/auth/authApi';
import Image from '../../components/Image';
import { GetUserByIdDTO } from 'api-client/users';
import { User } from '../../utils/user';

// Props for EditProfileForm
type EditProfileFormProps = {
  id?: string;
  loggedInUser?: User;
  userData?: GetUserByIdDTO;
  userIsLoading?: boolean;
  isEditMode?: boolean;
};

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  id,
  userData,
  userIsLoading,
  loggedInUser,
  isEditMode,
}) => {
  const navigate = useNavigate();

  // Update user functionality
  const {
    trigger,
    data: updateResponse,
    error: updateError,
    reset: updateReset,
    isLoading: updateIsLoading,
  } = useUpdateUser(id!);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<EditProfileForm>({
    defaultValues: {
      username: userData?.username,
      email: userData?.email,
      bio: userData?.bio,
    },
  });

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

  const onSubmit: SubmitHandler<EditProfileForm> = async (data) => {
    try {
      if (!data.img[0]) toast.error('Please upload a profile image');
      const img = await uploadImage(data.img[0]);
      const userData = {
        username: data.username,
        email: data.email,
        img: img ?? null,
        bio: data.bio,
      };
      trigger(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderInput = ({
    id,
    name,
    type,
    placeholder,
    registerOptions,
  }: EditProfileFormItem) => {
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

  const formItems: EditProfileFormItem[] = [
    {
      type: 'file',
      id: 'file-input',
      name: 'img',
      placeholder: 'Pick a profile picture',
      render: ({ name, ...rest }) =>
        isEditMode ? (
          <Image src={loggedInUser?.img ?? ' '} />
        ) : (
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
      name: 'username',
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
      type: 'bio',
      id: 'bio',
      name: 'bio',
      placeholder: 'Enter your bio',
      render: renderInput,
    },
  ];

  return (
    <>
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {formItems.map(({ id, render, ...item }) => (
            <div className="form-group" key={id}>
              {render?.({ id, ...item })}
            </div>
          ))}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Update
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default EditProfileForm;
