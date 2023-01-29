const express = require('express');
const router = express.Router();
const {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getProjects).post(protect, setProject);
router.route('/:id').delete(protect, deleteProject).put(protect, updateProject);

module.exports = router;
