import { axios } from '../../axios/axios';

const API_URL = '/api/projects/';

//Create new project
const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData);
  return response.data;
};

//get user projects
const getProjects = async (userId) => {
  const response = await axios.get(`${API_URL + userId}`);
  return response.data;
};

//get user projects
const getProject = async (id) => {
  const response = await axios.get(`${API_URL}project/${id}`);
  return response.data;
};

//Update user project
const updateProject = async (projectId, data) => {
  const response = await axios.put(`${API_URL}project/${projectId}`, data);
  return response.data;
};

//delete user projects
const deleteProject = async (projectId) => {
  const response = await axios.delete(`${API_URL}project/${projectId}`);
  return response.data;
};

const ProjectService = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};

export default ProjectService;
