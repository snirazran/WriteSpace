const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register new user
// @route POST /api/auth
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, friends, img, bio } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    img,
    bio,
    friends,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      img: user.img,
      bio: user.bio,
      friends: user.friends,
      likes: user.likes,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error('Invalid user data');
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Compare passwords

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      img: user.img,
      bio: user.bio,
      friends: user.friends,
      likes: user.likes,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error('Invalid credentials');
  }
});

// @desc Update user
// @route PUT /api/users/:id/edit
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

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
};
