import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectService from './ProjectService';

const initialState = {
  projects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Create new project
export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ProjectService.createProject(projectData, token);
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

//Get user projects
export const getProjects = createAsyncThunk(
  'projects/userId',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ProjectService.getProjects(userId, token);
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

//Delete user project
export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ProjectService.deleteProject(id, token);
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

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload.id
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
