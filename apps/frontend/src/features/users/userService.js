const API_URL = '/api/users/';

//get a user by id
const getUser = async (userId) => {
  const response = await axios.get(`${API_URL + userId}`);
  return response.data;
};

//get all users
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}`);
  console.log('hi');
  return response.data;
};

//get a user friends list by id
const getUserFriends = async (userId) => {
  const response = await axios.get(`${API_URL + userId}/friends`);
  return response.data;
};

//Add or remove friend
const addRemoveFriend = async (userId, friendId) => {
  const response = await axios.patch(`${API_URL + userId}/${friendId}`, {});
  return response.data;
};

const userService = {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
};

export default userService;
