import axios from 'axios';

const API_URL = '/api/projects/';

//Create new project
const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, projectData, config);
  return response.data;
};

//get user projects
const getProjects = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL + userId}`, config);
  return response.data;
};

//get user projects
const getProject = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}project/${id}`, config);
  return response.data;
};

//delete user projects
const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL + projectId}`, config);
  return response.data;
};

const ProjectService = {
  createProject,
  getProjects,
  getProject,
  deleteProject,
};

export default ProjectService;
