const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    genre: { type: String, required: [true, 'Please select a genre'] },
    name: { type: String, required: [true, 'Please add a name'] },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    img: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
