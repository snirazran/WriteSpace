import { UserDTO } from '../../../user-service/src/dtos/user.dto';
export interface User extends UserDTO {
  token?: string;
}

export function getUserFromLocalStorage(): User | null {
  const userJSON = localStorage.getItem('user');
  if (userJSON) {
    try {
      const user = JSON.parse(userJSON);
      return user;
    } catch (e) {
      console.error('Error parsing user from local storage', e);
      return null;
    }
  } else {
    return null;
  }
}
