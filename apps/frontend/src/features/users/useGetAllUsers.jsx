import { createAsyncThunk } from '@reduxjs/toolkit';
import useState from 'react';
import userService from './userService';
import useSWR from 'swr';
import useLocalStorage from '../../utils/useLocalStorage';

//Get all users
export const getAllUsers = async (url, token) => {
  return await userService.getAllUsers(token);
};

export const useGetAllusers = () => {
  const { storedValue: user } = useLocalStorage('user');

  const { data, isLoading, error } = useSWR(
    ['users/', user?.token],
    getAllUsers
  );

  return { data, isLoading, error };
};
