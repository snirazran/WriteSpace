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
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type Props<T extends FieldValues> = {
  alt?: string;
  description?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
} & HTMLAttributes<HTMLInputElement>;

// TODO: handle style, use SCSS modules
const UploadImage = <T extends object>({
  alt,
  name,
  description,
  onChange,
  register,
  ...inputAttr
}: Props<T>) => {
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
