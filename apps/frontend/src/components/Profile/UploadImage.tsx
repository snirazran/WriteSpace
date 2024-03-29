import { ChangeEvent, HTMLAttributes, useState } from 'react';
import placeholderImgUrl from '../../media/placeholder.png';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import './UploadImage.css';

type Props<T extends FieldValues> = {
  alt?: string;
  description?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  userImage?: string;
} & HTMLAttributes<HTMLInputElement>;

const UploadImage = <T extends object>({
  alt,
  name,
  description,
  userImage,
  onChange,
  register,
  ...inputAttr
}: Props<T>) => {
  const [imageLocal, setImageLocal] = useState<string | null>(
    userImage ?? null
  );
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
          <div className="register-photo-img">
            <img src={imageLocal ?? placeholderImgUrl} alt={alt} />
          </div>
        </label>

        <input
          id="file-input"
          type="file"
          key="file"
          accept=".jpg, .jpeg, .png"
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
