const express = require('express');
const router = express.Router();
const {
  getPost,
  getFeedPosts,
  getProjectPosts,
  setPost,
  updatePost,
  deletePost,
  likePost,
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, setPost).get(protect, getFeedPosts);
router
  .route('/:postId')
  .get(protect, getPost)
  .delete(protect, deletePost)
  .put(protect, updatePost);
router.route('/:id').delete(protect, deletePost);
router.route('/:projectId/posts').get(protect, getProjectPosts);
router.route('/:postId/like').patch(protect, likePost);

module.exports = router;
