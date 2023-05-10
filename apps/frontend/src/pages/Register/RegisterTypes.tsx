import { HTMLInputTypeAttribute } from 'react';
import { RegisterOptions } from 'react-hook-form';

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList; // react-hook-form override the onChange and sent the original event
};

export type RegistrationFormItem = {
  id: string;
  type: HTMLInputTypeAttribute;
  name: keyof RegisterForm;
  placeholder?: string;
  registerOptions?: RegisterOptions;
  render?: (props: RegistrationFormItem) => JSX.Element;
};
