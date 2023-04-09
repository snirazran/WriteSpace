import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
import useSWR from 'swr';
import { User } from '../../utils/user';

//Get all users
export const getUser = async (url): Promise<User[]> => {
  return await userService.getUser();
};

export const useGetUser = () => {
  const { data, isLoading, error } = useSWR(['users/'], getUser);
  return { data, isLoading, error };
};
