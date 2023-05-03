import { login } from './authService';
import SWRMutate from 'swr/mutation';
import { User } from '../../utils/user';

interface UserData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { data, error, isMutating, reset, trigger } = SWRMutate<User>(
    'login',
    (key: string, options: Readonly<{ arg: UserData }>) => {
      const { arg: userData } = options;
      return login(key, userData);
    }
  );

  return { data, error, isLoading: isMutating, reset, trigger };
};
