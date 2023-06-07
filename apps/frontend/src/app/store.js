import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projects/projectSlice';
import postReducer from '../features/posts/postSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    posts: postReducer,
    user: userReducer,
  },
});
