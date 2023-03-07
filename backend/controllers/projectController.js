const asyncHandler = require('express-async-handler');
const Project = require('../models/projectModel');

// @desc Get user Projects
// @route GET /api/projects/:userId
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const projects = await Project.find({ userId: userId });
  res.status(200).json(projects);
});

// @desc Get Project by id
// @route GET /api/projects/:userId
// @access Private
const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  res.status(200).json(project);
});

// @desc Set Project
// @route POST /api/projects
// @access Private
const setProject = asyncHandler(async (req, res) => {
  if (!req.body.genre) {
    res.status(400);
    throw new Error('Please add a genre field');
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a project name');
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add a description');
  }

  const project = await Project.create({
    genre: req.body.genre,
    name: req.body.name,
    description: req.body.description,
    img: req.body.img
      ? req.body.img
      : `https://firebasestorage.googleapis.com/v0/b/writespace-f343f.appspot.com/o/projectImages%2Fplaceholder.png?alt=media&token=5c87f4fa-d7a8-4800-873f-82f4947952bf`,
    userId: req.user.id,
    userImg: req.user.img,
    username: req.user.username,
  });

  res.status(200).json(project);
});

// @desc Update Projects
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the goal user
  if (project.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @desc Delete Projects
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the project user
  if (project.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await project.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProjects,
  getProject,
  setProject,
  updateProject,
  deleteProject,
};
