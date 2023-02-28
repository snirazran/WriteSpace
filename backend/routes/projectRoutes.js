const express = require('express');
const router = express.Router();
const {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, setProject);
router
  .route('/:userId')
  .get(protect, getProjects)
  .delete(protect, deleteProject)
  .put(protect, updateProject);

module.exports = router;
