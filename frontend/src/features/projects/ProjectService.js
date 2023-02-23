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

const ProjectService = {
  createProject,
};

export default ProjectService;
