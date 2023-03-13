import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  user: [],
  userFriends: [],
  userIsError: false,
  userIsSuccess: false,
  userIsLoading: false,
  userMessage: '',
};

//Get user by id
export const getUser = createAsyncThunk(
  'users/userId',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getUser(userId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get user friends by id
export const getUserFriends = createAsyncThunk(
  'users/userId/friends',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.getUserFriends(userId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update user info
export const updateUser = createAsyncThunk(
  'posts/update',
  async ({ id, userData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.updateUser(id, userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Add or remove friend
export const addRemoveFriend = createAsyncThunk(
  'users/userId/friendId',
  async (userId, friendId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.addRemoveFriend(userId, friendId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userIsSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userIsLoading = false;
        state.userIsError = true;
        state.userMessage = action.payload;
      })
      .addCase(getUserFriends.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(getUserFriends.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userIsSuccess = true;
        state.userFriends = action.payload;
      })
      .addCase(getUserFriends.rejected, (state, action) => {
        state.userIsLoading = false;
        state.userIsError = true;
        state.userMessage = action.payload;
      })
      .addCase(addRemoveFriend.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(addRemoveFriend.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userIsSuccess = true;
        state.userFriends = action.payload;
      })
      .addCase(addRemoveFriend.rejected, (state, action) => {
        state.userIsLoading = false;
        state.userIsError = true;
        state.userMessage = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userIsSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userIsLoading = false;
        state.userIsError = true;
        state.userMessage = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
