const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/:id/edit', protect, updateUser);

module.exports = router;
