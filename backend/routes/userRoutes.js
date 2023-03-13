const express = require('express');
const router = express.Router();

const {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.get('/:id', protect, getUser);
router.put('/:id/edit', protect, updateUser);
router.get('/:id/friends', protect, getUserFriends);
router.patch('/:id/:friendId', protect, addRemoveFriend);

module.exports = router;
