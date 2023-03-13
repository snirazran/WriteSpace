import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectService from './ProjectService';

const initialState = {
  projects: [],
  projectIsError: false,
  projectIsSuccess: false,
  projectIsLoading: false,
  projectMessage: '',
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

//Get project by id
export const getProject = createAsyncThunk(
  'projects/project/id',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ProjectService.getProject(id, token);
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

//Update user project
export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, projectData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ProjectService.updateProject(id, projectData, token);
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
    resetProjects: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.projectIsLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsError = true;
        state.projectMessage = action.payload;
      })
      .addCase(getProjects.pending, (state) => {
        state.projectIsLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsError = true;
        state.projectMessage = action.payload;
      })
      .addCase(getProject.pending, (state) => {
        state.projectIsLoading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsError = true;
        state.projectMessage = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.projectIsLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsSuccess = true;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload.id
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsError = true;
        state.projectMessage = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.projectIsLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsSuccess = true;
        const updatedProject = action.payload;
        const projectIndex = state.projects.findIndex(
          (project) => project._id === updatedProject._id
        );
        state.projects[projectIndex] = updatedProject;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.projectIsLoading = false;
        state.projectIsError = true;
        state.projectMessage = action.payload;
      });
  },
});

export const { resetProjects } = projectSlice.actions;
export default projectSlice.reducer;
