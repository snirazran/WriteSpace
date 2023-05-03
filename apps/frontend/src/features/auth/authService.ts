import axios from 'axios';
import { User } from '../../utils/user';
const API_URL = '/api/auth/';

interface UserData {
  email: string;
  password: string;
}

// Register User
export const register = async (userData: UserData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};

// Login User
export const login = async (url: string, userData: UserData): Promise<User> => {
  const response = await axios.post(API_URL + url, userData);
  return response.data;
};

// Update user
export const updateUser = async (id: string, data: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${id}/edit`, data, config);
  return response.data;
};

const authService = { register, logout, login, updateUser };

export default authService;
