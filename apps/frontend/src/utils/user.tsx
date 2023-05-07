export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  password: string;
  friends: string[];
  bio: string;
  img: string;
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
