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

//get feed posts
const getFeedPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}`, config);
  return response.data;
};

//get post by id
const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL + postId}`, config);
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

//Update user project
const updatePost = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL + id}`, data, config);
  return response.data;
};

//delete user post
const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL + id}`, config);
  return response.data;
};

const postService = {
  getFeedPosts,
  createPost,
  getPost,
  getProjectPosts,
  updatePost,
  deletePost,
};

export default postService;
