const express = require('express');
const router = express.Router();

const {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getUser);
router.get('/', protect, getAllUsers);

router.get('/:id/friends', protect, getUserFriends);
router.patch('/:id/:friendId', protect, addRemoveFriend);

module.exports = router;
