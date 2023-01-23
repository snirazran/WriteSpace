const asyncHandler = require('express-async-handler');

// @ desc Get Projects
// @route GET /api/projects
// @access Private
const getProjects = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get projects' });
});

// @ desc Set Project
// @route POST /api/projects
// @access Private
const setProject = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
});

// @ desc Update Projects
// @route PUT /api/projects/:id
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Update goal ${req.params.id}` });
});

// @ desc Delete Projects
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: `Delete goal ${req.params.id}` });
});

module.exports = {
  getProjects,
  setProject,
  updateProject,
  deleteProject,
};
