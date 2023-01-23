const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');

// @ desc Get Projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.status(200).json(projects);
});

// @ desc Set Project
// @route POST /api/projects
// @access Private
const setProject = asyncHandler(async (req, res) => {
  if (!req.body.genre) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title field');
  }

  const project = await Project.create({
    genre: req.body.genre,
    title: req.body.title,
    img: req.body.img ? req.body.img : null,
  });

  res.status(200).json(project);
});

// @ desc Update Projects
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @ desc Delete Projects
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  }

  await project.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
};
