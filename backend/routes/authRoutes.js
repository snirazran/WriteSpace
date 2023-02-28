const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
