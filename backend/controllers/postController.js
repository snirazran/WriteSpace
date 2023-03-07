const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const Project = require('../models/projectModel');

// @desc Get Feed Posts
// @route GET /api/posts/
// @access Private
const getFeedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

// @desc Get project posts
// @route GET /api/posts/:projectId/posts
// @access Private
const getProjectPosts = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const posts = await Post.find({ projectId: projectId });
  res.status(200).json(posts);
});

// @desc Set Post
// @route POST /api/posts
// @access Private
const setPost = asyncHandler(async (req, res) => {
  if (!req.body.type) {
    res.status(400);
    throw new Error('Please add a type field');
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a post name');
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add a description');
  }

  if (!req.body.content) {
    res.status(400);
    throw new Error('Please add content');
  }

  const project = await Project.findById(req.body.projectId);

  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  const post = await Post.create({
    type: req.body.type,
    name: req.body.name,
    description: req.body.description,
    content: req.body.content,
    img: req.body.img
      ? req.body.img
      : `https://firebasestorage.googleapis.com/v0/b/writespace-f343f.appspot.com/o/projectImages%2Fplaceholder.png?alt=media&token=5c87f4fa-d7a8-4800-873f-82f4947952bf`,
    likes: {},
    comments: {},
    userId: req.user.id,
    projectId: req.body.projectId,
    userImg: req.user.img,
    username: req.user.username,
    projectName: project.name,
    projectGenre: project.genre,
    projectImg: project.img,
  });
  res.status(200).json(post);
});

// @desc Update Post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the goal user
  if (post.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc Delete Post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the post user
  if (post.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc Get Posts
// @route GET /api/posts/:id
// @access Private
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  );

  res.status(200).json(updatedPost);
});

module.exports = {
  getProjectPosts,
  getFeedPosts,
  setPost,
  updatePost,
  deletePost,
  likePost,
};
