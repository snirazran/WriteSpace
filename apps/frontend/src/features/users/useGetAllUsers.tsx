import { createAsyncThunk } from '@reduxjs/toolkit';
import useState from 'react';
import userService from './userService';
import useSWR from 'swr';
import useLocalStorage from '../../utils/useLocalStorage';

type User = { name: string };

//Get all users
export const getUser = async (url): Promise<User[]> => {
  return await userService.getUser();
};

export const useGetUser = () => {
  const { data, isLoading, error } = useSWR(['users/'], getUser);

  return { data, isLoading, error };
};
