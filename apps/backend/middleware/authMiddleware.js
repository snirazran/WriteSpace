const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getTokenFromReq = (req) => {
  if (!req.headers.authorization?.startsWith('Bearer')) return null;
  return req.headers.authorization.split(' ')[1];
};

const protect = asyncHandler(async (req, res, next) => {
  const token = getTokenFromReq(req);

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    console.log(error);
    res.status(403);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
