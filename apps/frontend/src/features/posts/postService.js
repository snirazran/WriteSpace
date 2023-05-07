const API_URL = '/api/posts/';

//Create new post
const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

//get feed posts
const getFeedPosts = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

//get post by id
const getPost = async (postId) => {
  const response = await axios.get(`${API_URL + postId}`);
  return response.data;
};

//get project posts
const getProjectPosts = async (projectId) => {
  const response = await axios.get(`${API_URL + projectId}/posts`);
  return response.data;
};

//Update user project
const updatePost = async (id, data) => {
  const response = await axios.put(`${API_URL + id}`, data);
  return response.data;
};

//delete user post
const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL + id}`);
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
