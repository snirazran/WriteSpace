import axios from 'axios';

const API_URL = '/api/posts/';

//Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

//get project posts
const getProjectPosts = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL + projectId}/posts`, config);
  return response.data;
};

//delete user post
const deleteProject = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL + postId}`, config);
  return response.data;
};

const postService = {
  createPost,
  getProjectPosts,
  deleteProject,
};

export default postService;
