const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  setProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, setProject);
router.route('/:userId').get(protect, getProjects);

router
  .route('/project/:id')
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);
module.exports = router;
