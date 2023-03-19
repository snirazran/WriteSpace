import axios from 'axios';

const API_URL = '/api/users/';

//get a user by id
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL + userId}`, config);
  return response.data;
};

//get a user friends list by id
const getUserFriends = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL + userId}/friends`, config);
  return response.data;
};

//Add or remove friend
const addRemoveFriend = async (userId, friendId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(`${API_URL + userId}/${friendId}`, config);
  return response.data;
};

const userService = {
  getUser,
  getUserFriends,
  addRemoveFriend,
};

export default userService;
