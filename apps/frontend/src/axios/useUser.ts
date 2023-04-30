import { useLocalStorage } from '../utils/useLocalStorage';
import { User } from '../utils/user';

export const useUser = () => {
  console.log(useLocalStorage<User | null>('user', null));
  return useLocalStorage<User | null>('user', null);
};
