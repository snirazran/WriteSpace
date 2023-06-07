import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

const initialState = {
  posts: [],
  postIsError: false,
  postIsSuccess: false,
  postIsLoading: false,
  postMessage: '',
};

//Create new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      return await postService.createPost(postData);
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

//Get feed posts
export const getFeedPosts = createAsyncThunk(
  'posts/feed',
  async (_, thunkAPI) => {
    try {
      return await postService.getFeedPosts();
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

//Get post by id
export const getPost = createAsyncThunk(
  'posts/postId',
  async (postId, thunkAPI) => {
    try {
      return await postService.getPost(postId);
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

//Get project posts
export const getProjectPosts = createAsyncThunk(
  'posts/projectId/posts',
  async (projectId, thunkAPI) => {
    try {
      return await postService.getProjectPosts(projectId);
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

//Update user post
export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, postData }, thunkAPI) => {
    try {
      return await postService.updatePost(id, postData);
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

//Delete user post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id, thunkAPI) => {
    try {
      return await postService.deletePost(id);
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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPosts: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.postIsLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.postIsSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = true;
        state.postMessage = action.payload;
      })
      .addCase(getFeedPosts.pending, (state) => {
        state.postIsLoading = true;
      })
      .addCase(getFeedPosts.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.postIsSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getFeedPosts.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = true;
        state.postMessage = action.payload;
      })
      .addCase(getProjectPosts.pending, (state) => {
        state.postIsLoading = true;
      })
      .addCase(getProjectPosts.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.postIsSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getProjectPosts.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = true;
        state.postMessage = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.postIsLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.postIsSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(getPost.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = true;
        state.postMessage = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.postIsLoading = true;
        state.postIsSuccess = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.postIsSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = true;
        state.postMessage = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.postIsLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.postIsSuccess = true;
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );
        state.posts[postIndex] = updatedPost;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = true;
        state.postMessage = action.payload;
      });
  },
});

export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
