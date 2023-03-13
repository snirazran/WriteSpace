const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Get Users
// @route GET /api/users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  //Check if user exists
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    _id: user.id,
    username: user.username,
    email: user.email,
    img: user.img,
    bio: user.bio,
    friends: user.friends,
    likes: user.likes,
  });
});

// @desc Get User friends
// @route GET /api/users/:id/friends
// @access Private
const getUserFriends = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  //Check if user exists
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  //MIGHT CAUSE BUGS CHECK IF NOT WORKING
  //Check if there are friends
  if (!friends) {
    res.status(404);
    throw new Error('User have no friends');
  }

  //Format the data for frontend
  const formattedFriends = friends.map(({ _id, username, bio, img }) => {
    return { _id, username, bio, img };
  });
  res.status(200).json(formattedFriends);
});

// @desc Update Projects
// @route PUT /api/projects/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('Your User not found');
  }
  //Make sure the logged in user matches the goal user
  if (user._id.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

// @desc Add or Remove friend
// @route PATCH /api/users/:id/:friendId
// @access Private
const addRemoveFriend = asyncHandler(async (req, res) => {
  const { id, friendId } = req.params;

  const user = await User.findById(id);

  //Check if user exists
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const friend = await User.findById(friendId);

  //Check if friend exists
  if (!friend) {
    res.status(404);
    throw new Error('Friend not found');
  }

  //Add or remove functionality
  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
  }

  await user.save();
  await friend.save();

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  //MIGHT CAUSE BUGS CHECK IF NOT WORKING
  //Check if there are friends
  if (!friends) {
    res.status(404);
    throw new Error('User have no friends');
  }

  //Format the data for frontend
  const formattedFriends = friends.map(({ _id, username, bio, img }) => {
    return { _id, username, bio, img };
  });

  res.status(200).json(formattedFriends);
});

module.exports = {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
};
