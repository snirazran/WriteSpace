import {
  ChangeEvent,
  FC,
  HTMLAttributes,
  Ref,
  forwardRef,
  useState,
} from 'react';
import placeholderImgUrl from '../media/placeholder.png';
import classes from './UploadImage.scss?inline';
import { UseFormRegister } from 'react-hook-form';
import { RegisterForm } from '../pages/Register/RegisterTypes';

type Props = {
  alt?: string;
  description?: string;
  name: keyof RegisterForm;
  register?: UseFormRegister<RegisterForm>;
} & HTMLAttributes<HTMLInputElement>;

// TODO: handle style, use SCSS modules
const UploadImage: FC<Props> = ({
  alt,
  name,
  description,
  onChange,
  register,
  ...inputAttr
}) => {
  const [imageLocal, setImageLocal] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const objectUrl = URL.createObjectURL(file);
    setImageLocal(objectUrl);
    onChange?.(e);
  };

  return (
    <>
      <div className="register-photo">
        <label htmlFor="file-input">
          <img src={imageLocal ?? placeholderImgUrl} alt={alt} />
        </label>

        <input
          id="file-input"
          type="file"
          key="file"
          {...inputAttr}
          {...register?.(name, { onChange: handleChange })}
        />
        {description && (
          <div className="register-photo-text">
            <label htmlFor="file-input">
              <p>{description}</p>
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImage;
