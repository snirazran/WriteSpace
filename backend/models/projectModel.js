const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    genre: { type: String, required: [true, 'Please add a genre value'] },
    title: { type: String, required: [true, 'Please add a type value'] },
    img: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
