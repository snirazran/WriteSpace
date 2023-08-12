import { UpdateUserReqDto } from 'api-client/auth';
import { HTMLInputTypeAttribute } from 'react';
import { RegisterOptions } from 'react-hook-form';

export type EditProfileForm = Omit<UpdateUserReqDto, 'img'> & { img: FileList };

type EditProfileFormName = {
  img: FileList;
  username: string;
  email: string;
  bio: string;
};

export type EditProfileFormItem = {
  id: string;
  type: HTMLInputTypeAttribute;
  name: keyof EditProfileForm;
  placeholder?: string;
  registerOptions?: RegisterOptions;
  render?: (props: EditProfileFormItem) => JSX.Element;
  required?: boolean;
};
