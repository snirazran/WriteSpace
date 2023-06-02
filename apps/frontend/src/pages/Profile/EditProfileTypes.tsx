import { HTMLInputTypeAttribute } from 'react';
import { RegisterOptions } from 'react-hook-form';

export type EditProfileForm = {
  name: string;
  email: string;
  password: string;
  bio: string;
  profileImage: FileList; // react-hook-form override the onChange and sent the original event
};

export type EditProfileFormItem = {
  id: string;
  type: HTMLInputTypeAttribute;
  name: keyof EditProfileForm;
  placeholder?: string;
  registerOptions?: RegisterOptions;
  render?: (props: EditProfileFormItem) => JSX.Element;
};
